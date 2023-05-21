import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const tagRouter = createTRPCRouter({
  // Create a new organization tag
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
        if (error.code === "P2002") {
          // Unique constraint violation occurred
          console.error(
            "ERROR: Unique constraint violation. Unable to create new tag."
          );
          console.error(error);
          throw new Error("ERROR: Unique constraint violation for create tag");
        } else {
          console.error(error);
          throw new Error("ERROR: Cannot create the new tag");
        }
      }
    }),

  // Get tag basic info
  get: protectedProcedure
    .input(
      z.object({
        tagId: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const tag = await ctx.prisma.tag.findUnique({
          where: {
            id: input.tagId,
          },
        });
        return tag;
      } catch (error) {
        console.log(error);
      }
    }),

  // Get all notes associated with a tag
  getNotes: protectedProcedure
    .input(
      z.object({
        tagId: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const tagNotes = await ctx.prisma.tag.findUnique({
          select: {
            notes: {
              include: {
                user: {
                  select: {
                    name: true,
                    image: true,
                    id: true,
                  },
                },
                tags: true,
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          where: {
            id: input.tagId,
          },
        });
        return tagNotes?.notes ?? [];
      } catch (error) {
        console.log(error);
      }
    }),

  // Get all interactions associated with a tag
  getInteractions: protectedProcedure
    .input(
      z.object({
        tagId: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const tagInteractions = await ctx.prisma.tag.findUnique({
          select: {
            interactions: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          where: {
            id: input.tagId,
          },
        });
        return tagInteractions?.interactions ?? [];
      } catch (error) {
        console.log(error);
      }
    }),
});
