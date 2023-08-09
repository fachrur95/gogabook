import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";

export interface IMasterOther {
  id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterother_description: string;
  masterother_alias: string | null;
  masterother_type: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";
  masterother_tunjanganjabatan: number | null;
  masterother_iscbd: boolean | null;
  masterother_creditperiod: number | null;
  masterother_ispecahan: boolean | null;
  masterother_taxrate: number | null;
  masterother_tara: number | null;
  masterother_exchangevalue: number | null;
  masterother_issuperadmin: boolean | null;
  masterother_isallowhpp: boolean | null;
  masterother_isallowsalesprice: boolean | null;
  masterother_modemelihatinputan: boolean | null;
  masterother_active: boolean;
  masterother_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  description?: string | null;
  title?: string | null;
}

/* ===============================================
  ENUM OF MASTER OTHER TABLE
  1 brand
  2 kemasan
  3 expedisi
  4 reason
  5 jabatan
  6 credit termin
  7 uom
  8 tax
  9 exchange
  10 store
  11 masterusercategory
===============================================*/