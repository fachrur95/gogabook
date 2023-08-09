import type { IBusiness } from "@/types/cores/business";
import type { IMasterOther } from "../masterOther";

export interface IPriceBookStore {
  id: string;
  price_id: string;
  masterstore_id: string;
  masterbussiness_id: string;
  priceline_description: string;
  masterbussiness?: IBusiness | null;
  masterstore?: IMasterOther | null;
}
