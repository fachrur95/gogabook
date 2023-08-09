import type { ITransactionFakturDetail } from "./taxInvoiceDetail";

export interface ITransactionFaktur {
  id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  transfaktur_entrydatestart: number;
  transfaktur_entrydateend: number;
  transfaktur_awal: string | null;
  transfaktur_akhir: string | null;
  transfaktur_nomorawal: string | null;
  transfaktur_oleh: string;
  transfaktur_event: number | null;
  faktur_detail?: ITransactionFakturDetail[];
}
