import type { IBusiness } from "@/types/cores/business";
import type { IMasterAccount } from "../masterChartOfAccount";
import type { IMasterOther } from "../masterOther";

export interface IMasterPayment {
  id: string;
  masteraccount_id: string;
  masterstore_id: string;
  masterbussiness_id: string;
  masterpayment_description: string;
  masterpayment_cardcharges: number;
  masterpayment_active: boolean;
  masterpayment_oleh: string;
  payment_business?: IBusiness | null;
  payment_account?: IMasterAccount | null;
  payment_store?: IMasterOther | null;
  description?: string | null;
  title?: string | null;
}
