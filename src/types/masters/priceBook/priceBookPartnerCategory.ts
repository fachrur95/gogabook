import type { IBusiness } from "@/types/cores/business";
import type { IMasterPartnerCategory } from "../masterPartner/masterPartnerCategory";

export interface IPriceBookPartnerCategory {
  id: string;
  pricepartnercategory_id: string;
  price_id: string;
  masterpartnercategory_id: string;
  masterbussiness_id: string;
  priceline_description: string;
  masterbussiness?: IBusiness | null;
  masterpartnercategory?: IMasterPartnerCategory | null;
}
