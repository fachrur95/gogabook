export interface ITransactionDetailSerialBatch {
  id: string;
  transline_id: string;
  masterbussiness_id: string;
  transserialbatch_mode: 'S' | 'B';
  transserialbatch_nourut: number | null;
  transserialbatch_serialbatchtext: string;
  transserialbatch_proddate: number | null;
  transserialbatch_expdate: number | null;
  transserialbatch_vector: number;
  transserialbatch_qtyinput: number;
  transserialbatch_qty: number | null;
  transserialbatch_qtyfly: number | null;
  transserialbatch_oleh: string;
}

/* 
  ENUM OF MODE
  S Serial
  B Batch
*/