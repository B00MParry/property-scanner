import { createTRPCRouter } from "./trpc";
import { propertyRouter } from "./routers/property";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  property: propertyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
