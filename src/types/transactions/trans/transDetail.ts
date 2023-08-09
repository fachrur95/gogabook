import type { IBusiness } from "@/types/cores/business";
import type { IMasterAccount } from "@/types/masters/masterChartOfAccount";
import type { IMasterItem } from "@/types/masters/masterItem";
import type { IMasterItemUom } from "@/types/masters/masterItem/masterItemUom";
import type { IMasterOther } from "@/types/masters/masterOther";
import type { IMasterWarehouse } from "@/types/masters/masterWarehouse";
import type { ITransaction } from ".";
import type { ITransactionDetailSerialBatch } from "./transSerialBatch";

export interface ITransactionDetail {
  id: string;
  trans_id: string;
  transparentpayment_id: string | null;
  translineparent_id: string | null;
  translineparentcombine_id: string | null;
  masteritem_id: string | null;
  masteritemuom_id: string | null;
  masterwarehouse_id: string | null;
  masterstore_id: string | null;
  mastertax_id: string | null;
  masteraccount_id: string | null;
  masteraccountincomecashback_id: string | null;
  masteraccountpiutangcashback_id: string | null;
  masterpayment_id: string | null;
  masterkemasan_id: string | null;
  transbsline_id: string | null;
  masterbussiness_id: string;
  transline_barcode: string | null;
  transline_description: string | null;
  transline_alias: string | null;
  transline_nourut: number | null;
  transline_nourutinduk: number | null;
  transline_taxrate: number | null;
  transline_distribusipersen: number | null;
  transline_qtyinput: number;
  transline_qtyinputfly: number | null;
  transline_qtyrealize: number | null;
  transline_qtysystem: number | null;
  transline_qtyadjust: number | null;
  transline_convertionqty: number | null;
  transline_vector: number | null;
  transline_tara: number | null;
  transline_qty: number | null;
  transline_qtyfly: number | null;
  transline_tarafly: number | null;
  transline_defaultbahan: number | null;
  transline_priceinput: number | null;
  transline_price: number | null;
  transline_pricefly: number | null;
  transline_discinput: number | null;
  transline_disc: number | null;
  transline_discotherinput: number | null;
  transline_discother: number | null;
  transline_discgroupline: number | null;
  transline_discgrouplinevalue: number | null;
  transline_totaldiscvalue: number | null;
  transline_netraw: number | null;
  transline_net: number | null;
  transline_netvalue: number | null;
  transline_tax: number | null;
  transline_taxvalue: number | null;
  transline_komisi: number | null;
  transline_nettotalkomisi: number | null;
  transline_cardcharges: number | null;
  transline_cardchargesvalue: number | null;
  transline_pointperqty: number | null;
  transline_minqtyused: number | null;
  transline_maxqtyused: number | null;
  transline_uncertainty: "1" | "2" | "3";
  transline_ishide: boolean;
  masterbussiness?: IBusiness | null;
  transline_account?: IMasterAccount | null;
  transline_accountincomecashback?: IMasterAccount | null;
  transline_accountpiutangcashback?: IMasterAccount | null;
  transline_store?: IMasterOther | null;
  transline_taxes?: IMasterOther | null;
  transline_packaging?: IMasterOther | null;
  masterwarehouse?: IMasterWarehouse | null;
  masteritem?: IMasterItem | null;
  masteritemuom?: IMasterItemUom | null;
  trans_detail?: ITransaction | null;
  trans_parentpayment?: ITransaction | null;
  transline_child?: ITransactionDetail[];
  transline_parent?: ITransactionDetail | null;
  transline_child_combined?: ITransactionDetail[];
  transline_parent_combined?: ITransactionDetail | null;
  transserialbatches?: ITransactionDetailSerialBatch[];
}

/* 
  ENUM UNCERTAINTY
  1	fix, tidak boleh dirubah-ubah
  2	min max
  3	free, bebas ngisi qty berapapun
*/