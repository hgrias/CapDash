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
const mutationModels = ["Legislator"];
const mutations = [
  "create",
  "createMany",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
];

// Prisma middleware for adding mutations to Typesense Reindex Queue
export const mutationQueueMiddleware = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    // Manipulate params here
    const model = String(params.model);
    const action = params.action;

    // Only add mutations for certain models to the queue
    if (mutationModels.includes(model) && mutations.includes(action)) {
      // Wait for the result of the mutation
      const result: object = await next(params);

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

      console.log("UPSERT RESULT: ", upsertResult);

      return result;
    }

    return next(params);
  });
};
