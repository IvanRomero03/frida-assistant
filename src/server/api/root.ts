import { exampleRouter } from "rbrgs/server/api/routers/example";
import { chatsRouter } from "./routers/chatsRouter";
import { docsRouter } from "./routers/docs";
import { createTRPCRouter } from "rbrgs/server/api/trpc";
import { textToSpeechRouter } from "./routers/textToSpeech";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  chats: chatsRouter,
  docs: docsRouter,
  textToSpeech: textToSpeechRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
