import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { InteractionMethod, Prisma } from "@prisma/client";
import { z } from "zod";

const defaultInteractionSelect = Prisma.validator<Prisma.InteractionSelect>()({
  id: true,
  sessionId: true,
  noteId: true,
  content: true,
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
          cursor: cursor ? { id: cursor } : undefined,
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
          const nextItem = interactions.pop();
          if (nextItem) {
            nextCursor = nextItem.id;
          }
        }

        return {
          interactions: interactions,
          nextCursor,
        };
      } catch (error) {
        console.error(error);
      }
    }),

  // Create an interaction
  create: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
        content: z.string().max(100),
        sessionId: z.number().int(),
        method: z.nativeEnum(InteractionMethod),
        noteId: z.number().int().optional(),
        tags: z
          .array(
            z.object({
              id: z.number().int(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newInteraction = await ctx.prisma.interaction.create({
          data: {
            content: input.content,
            sessionId: input.sessionId,
            method: input.method,
            legislator: {
              connect: {
                id: input.legislatorId,
              },
            },
            note: {
              connect: {
                id: input.noteId,
              },
            },
            organization: {
              connect: {
                id: ctx.session.user.organizationId,
              },
            },
            user: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            tags: {
              connect: input.tags,
            },
          },
        });

        return newInteraction.id;
      } catch (error) {
        console.error(error);
      }
    }),
});
