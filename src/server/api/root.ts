import { createTRPCRouter } from "@/server/api/trpc";
import { credentialBusinessRouter } from "./routers/credentials/business";
import { credentialPrivilegeRouter } from "./routers/credentials/privilege";
import { credentialStoreRouter } from "./routers/credentials/store";
import { generalSettingRouter } from "./routers/settings/generalSetting";
import { menuRoleRouter } from "./routers/credentials/menuRole";
import { salesPurchaseRouter } from "./routers/transactions/sales-purchase";
import { procedureRouter } from "./routers/transactions/procedure";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  credentialBusiness: credentialBusinessRouter,
  credentialPrivilege: credentialPrivilegeRouter,
  credentialStore: credentialStoreRouter,
  generalSettings: generalSettingRouter,
  menuRole: menuRoleRouter,
  salesPurchase: salesPurchaseRouter,
  procedure: procedureRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
