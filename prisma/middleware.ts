import { type PrismaClient } from "@prisma/client";
import Typesense from "typesense";

// Typesense client
export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: "127.0.0.1", // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: "http", // For Typesense Cloud use https
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

// Models and actions we are looking for in prisma middleware
const mutationModels = ["Legislator", "Note"];
const mutations = [
  "create",
  "createMany",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
];

// Type of object used to upsert Note document into Typesense
type NoteUpsertObjectType = {
  createdAt: string;
  id: string;
  tags: string[];
  organizationId: string;
  createdByName: string;
  legislatorName: string;
  createdById: string;
  legislatorId: string;
  content: string;
};

// Prisma middleware for updating/reindexing Typesense documents
// TODO: Eventually do bulk indexing/removal from Typesense by using the mutation queue table
//       and a task queue / async processing
export const mutationQueueMiddleware = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    // Manipulate params here
    const model = String(params.model);
    const action = params.action;

    // Only add mutations for certain models to the queue
    if (mutationModels.includes(model) && mutations.includes(action)) {
      // Wait for the result of the mutation
      const result = await next(params);

      if (model === "Note") {
        // Get a default object for typesense upsert
        const upsertObject = {} as NoteUpsertObjectType;
        // Convert datetime to UNIX timestamp
        const dateObject = new Date(result.createdAt);
        const unixTimestamp = Math.floor(dateObject.getTime() / 1000);
        upsertObject.createdAt = unixTimestamp.toString();
        // Convert ID to string
        upsertObject.id = result.id.toString();
        // Get all tag IDs into a list of strings and overwrite tags list
        const tagIds = result?.tags?.map((tag: { id: string }) => {
          return tag.id.toString();
        });
        upsertObject.tags = tagIds;
        // Add organization ID so we can use a scoped API key
        upsertObject.organizationId = result?.user?.organizationId;
        // Add legislator name and created by user name
        upsertObject.createdByName = result.user.name;
        upsertObject.legislatorName = result.legislator.role.concat(
          ". ",
          result.legislator.firstName,
          " ",
          result.legislator.lastName
        );
        // Remap created by ID
        upsertObject.createdById = result.createdBy;
        // Add legislator ID
        upsertObject.legislatorId = result.legislator.id;
        // Add content
        upsertObject.content = result.content;

        // Add the updated record the queue
        await prisma.updateQueue.create({
          data: {
            action: action,
            model: model,
            data: upsertObject,
          },
        });

        // Upsert / Index to Typesense
        const upsertResult = await typesenseClient
          .collections(model)
          .documents()
          .upsert(upsertObject);

        console.log("Note document index: ", upsertResult);
      } else if (model === "Legislator") {
        // Add the updated record the queue
        await prisma.updateQueue.create({
          data: {
            action: action,
            model: model,
            data: result,
          },
        });

        // Upsert / Index to Typesense
        const upsertResult = await typesenseClient
          .collections(model)
          .documents()
          .upsert(result);
        console.log("Legislator Document Index: ", upsertResult);
      }

      return result;
    }

    return next(params);
  });
};
