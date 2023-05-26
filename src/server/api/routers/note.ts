import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const noteRouter = createTRPCRouter({
  // Get all notes for a legislator
  listForLegislator: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
        limit: z.number().min(1).max(100).nullish().optional(),
        cursor: z.number().int().nullish().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const limit = input.limit ?? 50;
        const { cursor } = input;

        const notes = await ctx.prisma.note.findMany({
          // get an extra item at the end which we'll use as next cursor
          take: limit + 1,
          where: {
            legislatorId: input.legislatorId,
          },
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;
        if (notes.length > limit) {
          // Remove the last item and use it as next cursor
          const nextItem = notes.pop();
          if (nextItem) {
            nextCursor = nextItem.id;
          }
        }

        return {
          notes: notes,
          nextCursor,
        };
      } catch (error) {
        console.error(error);
      }
    }),

  // Create a note
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        legislatorId: z.string(),
        tagIds: z
          .array(
            z.object({
              id: z.number().int(),
            })
          )
          .optional(), // [{id: 1}, {id: 2}, ...] | undefined
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newNote = await ctx.prisma.note.create({
          data: {
            content: input.content,
            user: {
              connect: { id: ctx.session.user.id },
            },
            legislator: {
              connect: { id: input.legislatorId },
            },
            tags: {
              connect: input.tagIds,
            },
          },
          select: {
            id: true,
            createdAt: true,
            createdBy: true,
            content: true,
            legislator: {
              select: {
                id: true,
                role: true,
                firstName: true,
                lastName: true,
              },
            },
            tags: {
              select: {
                id: true,
              },
            },
            user: {
              select: {
                name: true,
                organizationId: true,
              },
            },
          },
        });
        return newNote;
      } catch (error) {
        console.log(error);
      }
    }),

  // Delete a note
  delete: protectedProcedure
    .input(
      z.object({
        noteId: z.number().int(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.note.delete({
          where: {
            id: input.noteId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
