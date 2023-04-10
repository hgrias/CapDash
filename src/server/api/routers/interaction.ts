import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const defaultInteractionSelect = Prisma.validator<Prisma.InteractionSelect>()({
  id: true,
  sessionId: true,
  noteId: true,
  type: true,
  createdAt: true,
  tags: true,
  method: true,
  user: {
    select: {
      name: true,
      id: true,
    },
  },
});

export const interactionRouter = createTRPCRouter({
  // Get legislator interaction data for timeline elements
  getForLegislator: protectedProcedure
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

        const interactions = await ctx.prisma.interaction.findMany({
          // get an extra item at the end which we'll use as next cursor
          take: limit + 1,
          select: defaultInteractionSelect,
          where: {
            legislatorId: input.legislatorId,
            // Only get the relevant interactions for the user's organization
            organizationId: ctx.session.user.organizationId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;
        if (interactions.length > limit) {
          // Remove the last item and use it as next cursor
          const nextItem = interactions.pop()!;
          nextCursor = nextItem.id;
        }

        return {
          interactions: interactions,
          nextCursor,
        };
      } catch (error) {
        console.error(error);
      }
    }),
});
