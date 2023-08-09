import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterOther } from "../masterOther";

export interface IMasterWarehouse {
  id: string;
  masterstore_id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterwarehouse_description: string;
  masterwarehouse_active: boolean;
  masterwarehouse_oleh: string;
  warehouse_store?: IMasterOther | null;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  description?: string | null;
  title?: string | null;
}
