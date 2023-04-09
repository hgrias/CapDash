import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stafferRouter = createTRPCRouter({
  // List staffers for a legislator
  list: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const staffers = ctx.prisma.staffer.findMany({
          where: {
            legislatorId: input.legislatorId,
          },
          orderBy: {
            position: "asc",
          },
        });
        return staffers;
      } catch (error) {
        console.log(error);
      }
    }),
});
