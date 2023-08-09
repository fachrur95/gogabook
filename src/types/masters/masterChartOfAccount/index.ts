import type { IBusiness } from "@/types/cores/business";
import type { IMasterAccountSubClass } from "./masterAccountSubClass";

export interface IMasterAccount {
  id: string;
  masteraccountsubclass_id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masteraccount_description: string;
  masteraccount_alias: string;
  masteraccount_restrict: boolean;
  masteraccount_active: boolean;
  masteraccount_oleh: string;
  masteraccountsubclass?: IMasterAccountSubClass | null;
  masterbussiness?: IBusiness | null;
  description?: string | null;
}
