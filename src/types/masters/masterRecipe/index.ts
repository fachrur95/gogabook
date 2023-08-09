import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterItem } from "../masterItem";
import type { IMasterItemUom } from "../masterItem/masterItemUom";
import type { IMasterRecipeDetail } from "./masterRecipeDetail";

export interface IMasterRecipe {
  id: string;
  prod_id: string;
  masteritem_id: string;
  masteritemuom_id: string | null;
  masterplatform_id: string;
  masterbussiness_id: string;
  prod_qtyinput: number;
  prod_isallowadditem: boolean;
  prod_isjumlahkan: boolean;
  prod_active: boolean;
  prod_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  masteritem?: IMasterItem | null;
  masteritemuom?: IMasterItemUom | null;
  prodlines?: IMasterRecipeDetail[];
  description?: string | null;
  title?: string | null;
}
