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
                name: true,
                image: true,
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
          const nextItem = notes.pop()!;
          nextCursor = nextItem.id;
        }

        return {
          notes: notes,
          nextCursor,
        };
      } catch (error) {}
    }),

  // Create a note
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        legislatorId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newNote = await ctx.prisma.note.create({
          data: {
            content: input.content,
            user: {
              connect: { id: input.userId },
            },
            legislator: {
              connect: { id: input.legislatorId },
            },
          },
        });
        return newNote.id;
      } catch (error) {
        console.log(error);
      }
    }),
});
