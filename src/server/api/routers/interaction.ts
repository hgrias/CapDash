import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { InteractionType } from "@prisma/client";
import { z } from "zod";

export const interactionRouter = createTRPCRouter({
  // Get legislator interaction data for timeline elements
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
          // Only get the relevant interactions for the user's organization
          organizationId: ctx.session.user.organizationId,
        },
        select: {
          id: true,
          createdAt: true,
          createdBy: true,
          content: true,
          type: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
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
          // Create the interaction under the user's organization
          organizationId: ctx.session.user.organizationId,
        },
      });
    }),
});
