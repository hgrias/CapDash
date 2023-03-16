import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { InteractionType } from "@prisma/client";
import { z } from "zod";

export const interactionRouter = createTRPCRouter({
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
