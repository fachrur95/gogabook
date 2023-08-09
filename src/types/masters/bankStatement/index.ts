import type { IBusiness } from "@/types/cores/business";
import type { IMasterAccount } from "../masterChartOfAccount";

export interface IBankStatement {
  id: string;
  masteraccount_id: string;
  masterbussiness_id: string;
  transbs_bank: string;
  transbs_type: string;
  transbs_nomorrekening: string;
  transbs_nilai: number | null;
  transbs_entrydate: number;
  transbs_mode: string;
  transbs_oleh: string;
  transbs_waktu: number;
  masterbussiness?: IBusiness | null;
  masteraccount?: IMasterAccount | null;
}
