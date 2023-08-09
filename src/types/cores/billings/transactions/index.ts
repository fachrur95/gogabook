import type { IBusiness } from "../../business";
import type { IBillingTransactionDetail } from "./billingTransactionDetail";

export interface IBillingTransaction {
  id: string;
  transbilling_id: string;
  masterbussiness_id: string;
  transbilling_text: string;
  transbilling_urlpayment: string | null;
  transbilling_midtrans_id: string | null;
  transbilling_status: string | null;
  transbilling_waktu: number;
  masterbussiness?: IBusiness | null;
  transbillings?: IBillingTransactionDetail[];
}
