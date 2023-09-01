import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterOther } from "../masterOther";
import type { IMasterItemCategory } from "./masterItemCategory";
import type { IMasterItemUom } from "./masterItemUom";

export interface IMasterItem {
  id: string;
  masteritem_id: string;
  masteritemparent_id: string | null;
  masteritemcategory_id: string | null;
  mastertax_id: string | null;
  masteruom_id: string | null;
  masterbrand_id: string | null;
  masterplatform_id: string | null;
  masterbussiness_id: string;
  masteritem_description: string;
  masteritem_alias: string | null;
  masteritem_catatan: string | null;
  masteritem_barcode: string | null;
  masteritem_variantparent: string | null;
  masteritem_variantcontent: string | null;
  masteritem_isserialbatch: "S" | "B" | "N";
  masteritem_istara: boolean;
  masteritem_isvariant: "Y" | "N" | "C";
  masteritem_stockmin: number;
  masteritem_stockmax: number;
  masteritem_qtysellmin: number;
  masteritem_qtysellmax: number;
  masteritem_priceinputdefault: number;
  masteritem_active: boolean;
  masteritem_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  item_variant?: IMasterItem[];
  multiple_uom?: IMasterItemUom[];
  masteritemcategory?: IMasterItemCategory | null;
  item_tax?: IMasterOther | null;
  item_uom?: IMasterOther | null;
  item_brand?: IMasterOther | null;
  description?: string | null;
  title?: string | null;
}

export type MasterItemType = "stock" | "sales" | "purchase" | "assembly" | "disassembly" | "transfer" | "beginningbalance" | "adjustment" | "formula" | "component" | "seconduom" | "autoassembly" | "modifier";