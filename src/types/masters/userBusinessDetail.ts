import type { IBusiness } from "../cores/business";
import type { IMasterOther } from "./masterOther";
import type { IMasterWarehouse } from "./masterWarehouse";

export interface IUserBusinessDetail {
  id: string;
  masteruser_id: string;
  masterbussiness_id: string;
  masterusercategory_id: string;
  masteruserbussiness_active: boolean;
  masterbussiness?: IBusiness | null;
  userbusinessline_store?: IMasterOther | null;
  masterwarehouse?: IMasterWarehouse | null;
}