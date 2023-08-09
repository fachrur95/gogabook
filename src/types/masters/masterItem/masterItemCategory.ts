import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterAccount } from "../masterChartOfAccount";
import type { IMasterItemType } from "./masterItemType";

export interface IMasterItemCategory {
  id: string;
  itemcategory_id: string;
  masteritemtype_id: string;
  masteritemcategory_accountpersediaan: string;
  masteritemcategory_accounthpp: string;
  masteritemcategory_accountsales: string;
  masteritemcategory_accountsalesretur: string;
  masteritemcategory_accountsalesdisc: string;
  masteritemcategory_accountvatmasuk: string;
  masteritemcategory_accountvatkeluar: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masteritemcategory_description: string;
  masteritemcategory_active: boolean;
  masteritemcategory_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  masteritemtype?: IMasterItemType | null;
  itemcategory_accountpersediaan?: IMasterAccount | null;
  itemcategory_accounthpp?: IMasterAccount | null;
  itemcategory_accountsales?: IMasterAccount | null;
  itemcategory_accountsalesretur?: IMasterAccount | null;
  itemcategory_accountsalesdisc?: IMasterAccount | null;
  itemcategory_accountvatmasuk?: IMasterAccount | null;
  itemcategory_accountvatkeluar?: IMasterAccount | null;
  description?: string | null;
  title?: string | null;
}
