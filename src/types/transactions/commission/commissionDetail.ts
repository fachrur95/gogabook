import type { ICommission } from ".";

export interface ICommissionDetail {
  id: string;
  komisi_id: string;
  masterbussiness_id: string;
  komisiline_valueinput: number | null;
  komisiline_komisiinput: number | null;
  commission_detail?: ICommission | null;
}
