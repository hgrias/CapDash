import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const pageVisitRouter = createTRPCRouter({
  // Create a page visit for a user
  create: protectedProcedure
    .input(
      z.object({
        pageUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newPageVisit = await ctx.prisma.pageVisit.create({
          data: {
            pageUrl: input.pageUrl,
            userId: ctx.session.user.id,
          },
        });
        return newPageVisit;
      } catch (error) {
        console.error(error);
      }
    }),
});
