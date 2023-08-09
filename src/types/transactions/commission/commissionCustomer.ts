import type { ICommission } from ".";
import type { IMasterPartnerCategory } from "@/types/masters/masterPartner/masterPartnerCategory";
import type { IMasterPartner } from "@/types/masters/masterPartner";

export interface ICommissionCustomer {
  id: string;
  komisi_id: string;
  mastercustomer_id: string;
  mastercustomerkategori_id: string;
  masterbussiness_id: string;
  commission_customer?: ICommission | null;
  commission_customer_category?: IMasterPartnerCategory | null;
  commission_customer_partner?: IMasterPartner | null;
}
