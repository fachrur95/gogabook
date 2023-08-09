import type { IBusiness } from "../cores/business";
import type { IMasterOther } from "./masterOther";
import type { IMasterWarehouse } from "./masterWarehouse";

export interface IUserBusinessDetail {
  id: string;
  masteruserbussinessline_id: string;
  masteruserbussiness_id: string;
  masterwarehouse_id: string;
  masterstore_id: string;
  masterbussiness_id: string;
  masteruserbussinessline_default: boolean;
  masterbussiness?: IBusiness | null;
  userbusinessline_store?: IMasterOther | null;
  masterwarehouse?: IMasterWarehouse | null;
}