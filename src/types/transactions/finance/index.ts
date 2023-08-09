import type { IMasterOther } from "@/types/masters/masterOther";
import type { ITransaction } from "../trans";
import type { IFinanceDetail } from "./financeDetail";

export interface IFinance {
  id: string;
  finance_id: string;
  trans_id: string;
  masterexchange_id: string;
  masterbussiness_id: string;
  finance_text: string;
  finance_type: number;
  finance_entrydate: number | null;
  finance_duedate: number | null;
  finance_exchangevalue: number | null;
  finance_originalvalue: number | null;
  finance_currentvalue: number | null;
  finance_description: string | null;
  finance_oleh: string | null;
  financelines?: IFinanceDetail[];
  finance_exchange?: IMasterOther | null;
  trans?: ITransaction | null;
}
