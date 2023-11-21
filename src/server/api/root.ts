/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { cashierRouter } from "./routers/cashierRoute";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  cashier:cashierRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
