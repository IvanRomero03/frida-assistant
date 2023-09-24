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

  getChatMessages: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.message.findMany({
        where: {
          chatId: input.id,
        },
      });
    }),

  createMessage: protectedProcedure
    .input(z.object({ chatId: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.message.create({
        data: {
          text: input.text,
          chatId: input.chatId,
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
    .mutation(({ ctx, input }) => {
      return ctx.db.chat.create({
        data: {
          name: input.name,
          userId: input.userId,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.chat.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.chat.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
