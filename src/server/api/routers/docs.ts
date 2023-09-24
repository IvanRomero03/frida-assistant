import axios from "axios";
import { createTRPCRouter, protectedProcedure } from "rbrgs/server/api/trpc";
import { z } from "zod";

export const docsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ id: z.string(), ids: z.array(z.string()).optional() }))
    .query(async ({ ctx, input }) => {
      if (input.ids && input.ids.length > 0) {
        const docs = await ctx.db.docSource.findMany({
          where: {
            main_emb: {
              in: input.ids,
            },
          },
        });
        return docs;
      }
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
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
        text: z.string(),
        link: z.string().optional(),
        keywords: z.array(z.string()),
        relevant_sentences: z.array(z.string()),
        summary: z.string().optional(),
        main_emb: z.string().optional(),
        ids: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newDoc = await ctx.db.docSource.create({
        data: {
          name: input.name,
          text: input.text,
          userId: ctx.session.user.id,
          webLink: input.link,
          keywords: input.keywords,
          relevant_sentences: input.relevant_sentences,
          summary: input.summary,
          main_emb: input.main_emb,
        },
      });
      const newSegments = await ctx.db.textSegment.createMany({
        data: input?.ids?.map((emb) => ({
          id_parent: newDoc.id,
          emb_id: emb,
        })) as any,
      });
      return newDoc;
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
