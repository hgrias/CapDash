import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { State, Party, LegislatorRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { profile } from "console";

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
          organizationId: ctx.session.user.organizationId,
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
  getAll: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.legislator.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
      where: {
        // Only get legislators for the user's organization
        organizationId: ctx.session.user.organizationId,
      },
    });
  }),

  // Return all legislator IDs - Used to generate dynamic routes
  getAllIds: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.legislator.findMany({
      select: { id: true },
      // Only get legislators for the user's organization
      where: { organizationId: ctx.session.user.organizationId },
    });
  }),

  // Create a legislator
  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        state: z.nativeEnum(State),
        party: z.nativeEnum(Party),
        role: z.nativeEnum(LegislatorRole),
        district: z.string(),
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
            role: input.role,
            district: input.district,
            imageUri: input.imageUri,
            currentSessionId: input.currentSessionId,
            // Only create for the user's organization
            organizationId: ctx.session.user.organizationId,
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

  getProfileData: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const profileData = await ctx.prisma.legislator.findFirst({
          where: {
            id: input.legislatorId,
            organizationId: ctx.session.user.organizationId,
          },
          include: {
            staffers: {
              orderBy: {
                position: "asc",
              },
            },
            interactions: {
              orderBy: {
                createdAt: "desc",
              },
            },
            notes: {
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
            },
          },
        });

        if (!profileData) {
          return null;
        }

        return profileData;
      } catch (error) {
        console.error("Error in getProfileData: ", error);
        throw Error("Error in getProfileData");
      }
    }),

  getNotes: protectedProcedure
    .input(
      z.object({
        legislatorId: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const legislatorNotes = await ctx.prisma.legislator.findFirst({
          where: {
            id: input.legislatorId,
            organizationId: ctx.session.user.organizationId,
          },
          select: {
            notes: {
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
            },
          },
        });
        // If there are no notes, return an empty array
        if (!legislatorNotes) {
          return [];
        }
        // Otherwise, return the objects
        return legislatorNotes;
      } catch (error) {
        console.error(error);
      }
    }),
});
