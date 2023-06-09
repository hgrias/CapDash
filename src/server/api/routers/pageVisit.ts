import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const pageVisitRouter = createTRPCRouter({
  getRecentlyVisited: protectedProcedure.query(async ({ ctx }) => {
    try {
      const recentlyVisitedPages = await ctx.prisma.pageVisit.findMany({
        select: {
          pageUrl: true,
        },
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          timestamp: "desc",
        },
        take: 5,
        distinct: ["pageUrl"],
      });

      const pageInfo = await Promise.all(
        recentlyVisitedPages.map(async (page) => {
          const urlTokens = page.pageUrl.split("/");
          if (urlTokens.includes("legislators")) {
            const legislatorData = await ctx.prisma.legislator.findUnique({
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
              where: {
                id: urlTokens[urlTokens.length - 1],
              },
            });
            return { ...legislatorData, type: "legislator", url: page.pageUrl };
          } else if (urlTokens.includes("tags")) {
            const tagData = await ctx.prisma.tag.findUnique({
              select: {
                id: true,
                name: true,
              },
              where: {
                id: parseInt(urlTokens[urlTokens.length - 1]),
              },
            });
            return { ...tagData, type: "tag", url: page.pageUrl };
          }
        })
      );
      return pageInfo;
    } catch (error) {
      console.error(error);
    }
  }),

  // Create a page visit for a user
  create: protectedProcedure
    .input(
      z.object({
        pageUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newPageVisit = await ctx.prisma.pageVisit.create({
          data: {
            pageUrl: input.pageUrl,
            userId: ctx.session.user.id,
          },
        });
        return newPageVisit;
      } catch (error) {
        console.error(error);
      }
    }),
});
