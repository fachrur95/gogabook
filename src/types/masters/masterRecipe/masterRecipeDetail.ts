import type { IBusiness } from "@/types/cores/business";
import type { IMasterItemUom } from "../masterItem/masterItemUom";

export interface IMasterRecipeDetail {
  id: string;
  prodline_id: string;
  prod_id: string;
  masteritemuom_id: string;
  masterbussiness_id: string;
  prodline_qtyused: string;
  prodline_maxqtyused: string;
  prodline_distribusidisassembly: string;
  prodline_uncertainty: string;
  masterbussiness?: IBusiness | null;
  masteritemuom?: IMasterItemUom | null;
}
