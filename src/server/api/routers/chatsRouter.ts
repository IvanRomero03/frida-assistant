import { createTRPCRouter, protectedProcedure } from "rbrgs/server/api/trpc";
import { z } from "zod";

export const chatsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.chat.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.chat.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({ userId: z.string(), name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.chat.create({
        data: {
          name: input.name,
          userId: input.userId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.chat.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
