import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
      // Get all organization tags
      const orgTags = await ctx.prisma.organization.findMany({
        select: {
          tags: true,
        },
        where: {
          id: ctx.session.user.organizationId,
        },
      });
      // Get all favorited tags from the user
      const favoriteTags = await ctx.prisma.userFavoriteTag.findMany({
        select: {
          tagId: true,
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
      const favoriteTagIds = favoriteTags.map((tag) => tag.tagId);
      // Add isFavorite attribute so we know which tags a user has favorited
      const newTagsArray = orgTags.map((orgTag) => {
        const newTags = orgTag.tags.map((tag) => ({
          ...tag,
          isFavorite: favoriteTagIds.includes(tag.id),
        }));
        return newTags;
      });
      return newTagsArray[0];
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
