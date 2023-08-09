import type { ICommission } from ".";
import type { IMasterItemCategory } from "@/types/masters/masterItem/masterItemCategory";
import type { IMasterItem } from "@/types/masters/masterItem";

export interface ICommissionTerm {
  id: string;
  komisisyarat_id: string;
  komisi_id: string;
  masteritem_id: string;
  masteritemcategory_id: string;
  masterbussiness_id: string;
  commission_terms?: ICommission | null;
  commission_terms_item_category?: IMasterItemCategory | null;
  commission_terms_item?: IMasterItem | null;
}
