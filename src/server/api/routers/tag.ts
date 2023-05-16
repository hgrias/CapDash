import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const tagRouter = createTRPCRouter({
  getPageInfo: protectedProcedure
    .input(
      z.object({
        tagId: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const tag = await ctx.prisma.tag.findUnique({
          select: {
            name: true,
            interactions: true,
            notes: true,
          },
          where: {
            id: input.tagId,
          },
        });
        return tag;
      } catch (error) {
        console.log(error);
      }
    }),
});
