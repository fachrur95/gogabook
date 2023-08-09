import type { IBusiness } from "@/types/cores/business";
import type { IMasterItem } from ".";
import type { IMasterOther } from "../masterOther";

export interface IMasterItemUom {
  id: string;
  masteritem_id: string;
  masteruom_id: string;
  masterbussiness_id: string;
  masteritemuom_barcode: string | null;
  masteritemuom_convertionqty: number;
  masteritemuom_oleh: string;
  masterbussiness?: IBusiness | null;
  itemuom_uom?: IMasterOther | null;
  multiple_uom?: IMasterItem | null;
  description?: string | null;
  title?: string | null;
}
