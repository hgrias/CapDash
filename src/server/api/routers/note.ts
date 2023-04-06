import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const noteRouter = createTRPCRouter({
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
