import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const noteRouter = createTRPCRouter({
  // Get all notes for a legislator
  getAllForLegislator: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const legislatorNotes = await ctx.prisma.note.findMany({
          where: {
            legislatorId: input.legislatorId,
          },
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
        return legislatorNotes;
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
