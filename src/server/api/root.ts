import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { legislatorRouter } from "./routers/legislator";
import { interactionRouter } from "./routers/interaction";
import { noteRouter } from "./routers/note";
import { stafferRouter } from "./routers/staffer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  legislator: legislatorRouter,
  interaction: interactionRouter,
  note: noteRouter,
  staffer: stafferRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
