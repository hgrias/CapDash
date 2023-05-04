import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import Typesense from "typesense";

const typesenseClient = (orgSearchApiKey: string) => {
  return new Typesense.Client({
    nodes: [
      {
        host: "127.0.0.1", // For Typesense Cloud use xxx.a1.typesense.net
        port: 8108, // For Typesense Cloud use 443
        protocol: "http", // For Typesense Cloud use https
      },
    ],
    apiKey: orgSearchApiKey,
    connectionTimeoutSeconds: 2,
  });
};

export const searchRouter = createTRPCRouter({
  // Generate a scoped API key for an org user
  generateScopedApiKey: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Get the search scoped API key for the org
      const orgSearchApiKey = await ctx.prisma.organization.findUnique({
        select: {
          searchApiKey: true,
        },
        where: {
          id: ctx.session.user.organizationId,
        },
      });
      // Check to make sure the org search API key exists
      if (!orgSearchApiKey) {
        throw "Organization search API key not found";
      }
      const keyWithSearchPermissions = orgSearchApiKey.searchApiKey;
      // Generate the scoped api key with organization API key
      const scopedSearchApiKey = typesenseClient(keyWithSearchPermissions)
        .keys()
        .generateScopedSearchKey(keyWithSearchPermissions, {
          filter_by: `organizationId:${ctx.session.user.organizationId}`,
          //   expires_at:
        });
      return scopedSearchApiKey;
    } catch (error) {
      console.error(error);
    }
  }),
});
