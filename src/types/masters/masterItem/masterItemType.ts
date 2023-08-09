import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";

export interface IMasterItemType {
  id: string;
  masteritemtype_id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masteritemtype_description: string;
  masteritemtype_isstock: boolean;
  masteritemtype_issold: boolean;
  masteritemtype_ispurchase: boolean;
  masteritemtype_isassembly: boolean;
  masteritemtype_isdissassembly: boolean;
  masteritemtype_istransfer: boolean;
  masteritemtype_isbeginbalance: boolean;
  masteritemtype_isadjustment: boolean;
  masteritemtype_isformula: boolean;
  masteritemtype_iscomponent: boolean;
  masteritemtype_seconduom: boolean;
  masteritemtype_isautoassembly: boolean;
  masteritemtype_ismodifier: boolean;
  masteritemtype_active: boolean;
  masteritemtype_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  description?: string | null;
  title?: string | null;
}
