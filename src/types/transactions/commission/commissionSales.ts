import type { ICommission } from ".";
import type { IMasterPartner } from "@/types/masters/masterPartner";

export interface ICommissionSales {
  id: string;
  komisisales_id: string;
  komisi_id: string;
  mastersales_id: string;
  masterbussiness_id: string;
  commission_sales?: ICommission | null;
  commission_sales_partner?: IMasterPartner | null;
}
