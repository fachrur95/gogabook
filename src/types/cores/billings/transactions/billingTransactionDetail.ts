import type { IBillingTransaction } from ".";
import type { IItemBilling } from "../itemBilling";

export interface IBillingTransactionDetail {
  id: string;
  transbilling_id: string;
  masteritembilling_id: string;
  translinebilling_qtyinput: number | null;
  translinebilling_valueinput: number | null;
  translinebilling_discinput: number | null;
  translinebilling_netvalue: number | null;
  transbilling?: IBillingTransaction | null;
  masteritembilling?: IItemBilling | null;
}
