import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { State, Party, LegislatorRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

// Default selector for legislator
const defaultLegislatorSelect = Prisma.validator<Prisma.LegislatorSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  state: true,
  party: true,
  role: true,
  imageUri: true,
  phone: true,
  email: true,
  capitolOfficeNumber: true,
  websiteUrl: true,
  chamberWebsiteUrl: true,
  capitolWebsiteUrl: true,
  currentSessionId: true,
});

export const legislatorRouter = createTRPCRouter({
  // Get a single legislator from Legislator ID
  byId: protectedProcedure
    .input(z.object({ legislatorId: z.string() }))
    .query(({ ctx, input }) => {
      try {
        const legislator = ctx.prisma.legislator.findUnique({
          select: defaultLegislatorSelect,
          where: {
            id: input.legislatorId,
          },
        });
        return legislator;
      } catch (error) {
        console.log(error);
      }
    }),

  // Get all legislators
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const legislators = ctx.prisma.legislator.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          district: true,
          role: true,
          party: true,
        },
        where: {
          // Only get legislators for the user's organization
          organizationId: ctx.session.user.organizationId,
        },
        orderBy: {
          lastName: "asc",
        },
      });
      return legislators;
    } catch (error) {
      console.error(error);
    }
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
});
