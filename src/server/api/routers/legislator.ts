import { z } from "zod";
import { State, Party, Chamber } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const legislatorRouter = createTRPCRouter({
  // Check to see if the legislator exists based on their name and state
  exists: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        state: z.nativeEnum(State),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.legislator.findFirst({
        where: {
          firstName: input.firstName,
          lastName: input.lastName,
          state: input.state,
        },
        select: {
          id: true,
        },
      });
    }),
  // Get a single legislator from Legislator ID
  getById: protectedProcedure
    .input(z.object({ legislatorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.legislator.findUnique({
        where: {
          id: input.legislatorId,
        },
      });
    }),

  // Get all legislators
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.legislator.findMany();
  }),

  // Return all legislator IDs - Used to generate dynamic routes
  // TODO: Will probably have to pare down the results to legislators the user has access to
  getAllIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.legislator.findMany({ select: { id: true } });
  }),

  // Create a legislator
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        state: z.nativeEnum(State),
        party: z.nativeEnum(Party),
        chamber: z.nativeEnum(Chamber),
        district: z.number().int(),
        chamberWebsiteUrl: z.string().optional(),
        capitolWebsiteUrl: z.string().optional(),
        imageUri: z.string().optional(),
        currentSessionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdLegislator = await ctx.prisma.legislator.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            state: input.state,
            party: input.party,
            chamber: input.chamber,
            district: input.district,
            chamberWebsiteUrl: input.chamberWebsiteUrl,
            capitolWebsiteUrl: input.capitolWebsiteUrl,
            imageUri: input.imageUri,
            currentSessionId: input.currentSessionId,
          },
        });
        return createdLegislator.id;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint violation
          if (error.code === "P2002") {
            throw new TRPCError({
              message: "A legislator with the same information already exists.",
              // TODO: Change code to "UNPROCESSABLE_CONTENT" https://trpc.io/docs/server/error-handling
              code: "CONFLICT",
            });
          }
        }
        throw error;
      }
    }),
});
