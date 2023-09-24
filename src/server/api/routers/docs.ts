import { createTRPCRouter, protectedProcedure } from "rbrgs/server/api/trpc";
import { z } from "zod";

export const docsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.docSource.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.docSource.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ userId: z.string(), name: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.docSource.create({
        data: {
          name: input.name,
          text: input.text,
          userId: input.userId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.docSource.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
