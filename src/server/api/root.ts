import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { credentialBusinessRouter } from "./routers/credentials/business";
import { credentialPrivilegeRouter } from "./routers/credentials/privilege";
import { credentialStoreRouter } from "./routers/credentials/store";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  credentialBusiness: credentialBusinessRouter,
  credentialPrivilege: credentialPrivilegeRouter,
  credentialStore: credentialStoreRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
