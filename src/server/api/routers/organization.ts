import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const organizationRouter = createTRPCRouter({
  // Get a a user's organization basic info
  info: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userOrg = await ctx.prisma.organization.findFirst({
        select: {
          id: true,
          name: true,
          slug: true,
          imageUri: true,
        },
        where: {
          id: ctx.session.user.organizationId,
        },
      });
      return userOrg;
    } catch (error) {
      console.error(error);
    }
  }),

  // Get an org's tags
  tags: protectedProcedure.query(async ({ ctx }) => {
    try {
      const orgTags = await ctx.prisma.organization.findMany({
        select: {
          tags: true,
        },
        where: {
          id: ctx.session.user.organizationId,
        },
      });
      return orgTags;
    } catch (error) {
      console.error(error);
    }
  }),

  // Get an org's sessions
  sessions: protectedProcedure.query(async ({ ctx }) => {
    try {
      const sessions = await ctx.prisma.organization.findMany({
        select: {
          sessions: true,
        },
        where: {
          id: ctx.session.user.organizationId,
        },
      });
      return sessions;
    } catch (error) {
      console.error(error);
    }
  }),
});
