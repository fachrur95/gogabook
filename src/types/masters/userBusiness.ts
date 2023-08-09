import type { IBusiness } from "../cores/business";
import type { IMasterOther } from "./masterOther";
import type { IUserBusinessDetail } from "./userBusinessDetail";

export interface IUserBusiness {
  id: string;
  masteruser_id: string;
  masterbussiness_id: string;
  masterusercategory_id: string;
  masteruserbussiness_active: boolean;
  masteruserbussinesslines?: IUserBusinessDetail[];
  userbusiness_usercategory?: IMasterOther | null;
  masterbussiness?: IBusiness | null;
}