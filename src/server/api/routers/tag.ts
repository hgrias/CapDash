import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const tagRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        icon: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdTag = await ctx.prisma.tag.create({
          data: {
            name: input.name,
            icon: input.icon,
            organization: {
              connect: {
                id: ctx.session.user.organizationId,
              },
            },
          },
        });
        return createdTag.id;
      } catch (error) {
        console.error(error);
      }
    }),

  // Get all info needed for the org tag page
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
