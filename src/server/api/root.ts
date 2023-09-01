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
import { massProductionRouter } from "./routers/transactions/mass-production";
import { stockAdjustmentRouter } from "./routers/transactions/stock-adjustment";
import { journalEntryRouter } from "./routers/transactions/journal-entry";
import { allTransactionRouter } from "./routers/transactions/all-transaction";
import { masterItemRouter } from "./routers/masters/item";
import { masterItemCategoryRouter } from "./routers/masters/itemCategory";
import { masterItemTypeRouter } from "./routers/masters/itemType";
import { masterOtherRouter } from "./routers/masters/other";
import { masterRecipeRouter } from "./routers/masters/recipe";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  credentialBusiness: credentialBusinessRouter,
  credentialPrivilege: credentialPrivilegeRouter,
  credentialStore: credentialStoreRouter,
  procedure: procedureRouter,
  // transactions path =================================================================
  salesPurchase: salesPurchaseRouter,
  liability: liabilityRouter,
  payment: paymentRouter,
  production: productionRouter,
  transferFund: transferFundRouter,
  transferItem: transferItemRouter,
  massProduction: massProductionRouter,
  stockAdjustment: stockAdjustmentRouter,
  journalEntry: journalEntryRouter,
  allTransaction: allTransactionRouter,

  // masters path ======================================================================
  masterItem: masterItemRouter,
  masterItemCategory: masterItemCategoryRouter,
  masterItemType: masterItemTypeRouter,
  masterOther: masterOtherRouter,
  masterRecipe: masterRecipeRouter,

  // settings path =====================================================================
  generalSettings: generalSettingRouter,
  menuRole: menuRoleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
