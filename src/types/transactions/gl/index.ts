import type { ITransaction } from "../trans";
import type { IGeneralLedgerDetail } from "./glDetail";

export interface IGeneralLedger {
  id: string;
  trans_id: string;
  masterbussiness_id: string;
  gl_text: string;
  gl_status: string;
  gl_type: number;
  gl_description: string | null;
  gl_entrydate: number | null;
  gl_nomorgiro: string | null;
  gl_oleh: string;
  gllines?: IGeneralLedgerDetail[];
  trans?: ITransaction | null;
}
