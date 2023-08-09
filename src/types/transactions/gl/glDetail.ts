import type { IMasterAccount } from "@/types/masters/masterChartOfAccount";
import type { ITransactionDetail } from "../trans/transDetail";
import type { IMasterOther } from "@/types/masters/masterOther";
import type { IMasterItem } from "@/types/masters/masterItem";
import type { IGeneralLedger } from ".";

export interface IGeneralLedgerDetail {
  id: string;
  glline_id: string;
  gl_id: string;
  transline_id: string | null;
  masteraccount_id: string;
  masteritem_id: string | null;
  masterexchange_id: string | null;
  masterbussiness_id: string;
  glline_description: string | null;
  glline_exchangevalue: number | null;
  glline_vector: number | null;
  glline_amount: number | null;
  glline_amountvalue: number | null;
  transline?: ITransactionDetail | null;
  masteraccount?: IMasterAccount | null;
  masterother?: IMasterOther | null;
  masteritem?: IMasterItem | null;
  gl?: IGeneralLedger | null;
}
