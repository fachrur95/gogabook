import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";

export interface IMasterPartnerCategory {
  id: string;
  masterjabatan_id?: string | null;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterpartnercategory_description: string;
  masterpartnercategory_supplier: boolean;
  masterpartnercategory_customer: boolean;
  masterpartnercategory_karyawan: boolean;
  masterpartnercategory_active: boolean;
  masterpartnercategory_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  description?: string | null;
  title?: string | null;
}
