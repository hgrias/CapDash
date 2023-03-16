import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { InteractionType } from "@prisma/client";
import { z } from "zod";

export const interactionRouter = createTRPCRouter({
  // Get all interactions for a legislator
  getAllForLegislator: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.interaction.findMany({
        where: {
          legislatorId: input.legislatorId,
        },
        orderBy: {
          createdAt: "desc",
        },
        // Include the interaction creator's name
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });
    }),

  // Create an interaction
  create: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string(),
        content: z.string(),
        sessionId: z.number(),
        type: z.nativeEnum(InteractionType),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.interaction.create({
        data: {
          createdBy: ctx.session.user.id,
          legislatorId: input.legislatorId,
          content: input.content,
          sessionId: input.sessionId,
          type: input.type,
        },
      });
    }),
});
