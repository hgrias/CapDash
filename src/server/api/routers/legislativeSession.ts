import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const legislativeSessionRouter = createTRPCRouter({
  // Get the user organization's currently active legislative session
  getActiveSession: protectedProcedure.query(async ({ ctx }) => {
    try {
      const activeSession = await ctx.prisma.legislativeSession.findFirst({
        select: {
          id: true,
          sessionName: true,
          sessionTitle: true,
          active: true,
          special: true,
          yearStart: true,
          yearEnd: true,
        },
        where: {
          active: true,
          organizationId: ctx.session.user.organizationId,
        },
      });
      return activeSession;
    } catch (error) {
      console.error(error);
    }
  }),
});
