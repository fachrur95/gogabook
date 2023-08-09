import type { IMasterOther } from "@/types/masters/masterOther";
import type { IFinance } from ".";
import type { ITransaction } from "../trans";

export interface IFinanceDetail {
  id: string;
  finance_id: string;
  trans_id: string;
  masterexchange_id: string;
  masterbussiness_id: string;
  financeline_text: string;
  financeline_status: "P" | "O" | "C";
  financeline_type: number;
  financeline_entrydate: number | null;
  financeline_nomorgiro: string | null;
  financeline_girojatem: number | null;
  financeline_girocair: number | null;
  financeline_vector: number | null;
  financeline_exchangevalue: number | null;
  financeline_total: number | null;
  financeline_totalvalue: number | null;
  financeline_description: string | null;
  financeline_oleh: string;
  finance?: IFinance | null;
  financedetail_exchange?: IMasterOther | null;
  trans?: ITransaction | null;
}
