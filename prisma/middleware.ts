import { type PrismaClient } from "@prisma/client";

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

// Prisma middleware for adding mutations to Typesense Reindex Queue
export const mutationQueue = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    // Manipulate params here
    const model = String(params.model);
    const action = params.action;

    // Only add mutations for certain models to the queue
    if (mutationModels.includes(model) && mutations.includes(action)) {
      // Wait for the result of the mutation
      const result = await next(params);

      // Add the updated record the queue
      await prisma.updateQueue.create({
        data: {
          action: action,
          model: model,
          data: result,
        },
      });

      console.log("\n\nADDED TO QUEUE!!!\n\n");

      return result;
    }

    return next(params);
  });
};
