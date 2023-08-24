import { createTRPCRouter } from "@/server/api/trpc";
import { credentialBusinessRouter } from "./routers/credentials/business";
import { credentialPrivilegeRouter } from "./routers/credentials/privilege";
import { credentialStoreRouter } from "./routers/credentials/store";
import { generalSettingRouter } from "./routers/settings/generalSetting";
import { menuRoleRouter } from "./routers/credentials/menuRole";
import { salesPurchaseRouter } from "./routers/transactions/sales-purchase";
import { procedureRouter } from "./routers/transactions/procedure";
import { liabilityRouter } from "./routers/transactions/liability";
import { paymentRouter } from "./routers/transactions/payment";
import { productionRouter } from "./routers/transactions/production";
import { transferFundRouter } from "./routers/transactions/transfer-fund";
import { transferItemRouter } from "./routers/transactions/transfer-item";

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
  procedure: procedureRouter,
  salesPurchase: salesPurchaseRouter,
  liability: liabilityRouter,
  payment: paymentRouter,
  production: productionRouter,
  transferFund: transferFundRouter,
  transferItem: transferItemRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
