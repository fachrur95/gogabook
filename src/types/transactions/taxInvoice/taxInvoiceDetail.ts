import type { ITransaction } from "../trans";

export interface ITransactionFakturDetail {
  id: string;
  transfaktur_id: string;
  masterbussiness_id: string;
  transfakturline_ubah: number | null;
  transfakturline_nomor: string | null;
  trans?: ITransaction[];
}
