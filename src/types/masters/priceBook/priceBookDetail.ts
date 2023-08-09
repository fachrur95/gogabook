import type { IBusiness } from "@/types/cores/business";
import type { IMasterItemUom } from "../masterItem/masterItemUom";

export interface IPriceBookDetail {
  id: string;
  price_id: string;
  masteritemuom_id: string;
  masteraccountincomecashback_id: string | null;
  masteraccountpiutangcashback_id: string | null;
  masterbussiness_id: string;
  priceline_description: string;
  priceline_mode: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  priceline_qtyinput: number | null;
  priceline_convertionqty: number | null;
  priceline_qty: number | null;
  priceline_valueinput: number | null;
  priceline_valuemininput: number | null;
  priceline_valuemaxinput: number | null;
  priceline_price: number | null;
  priceline_discinput: number | null;
  priceline_disc: number | null;
  priceline_maxdiscinput: number | null;
  priceline_maxdisc: number | null;
  priceline_active: boolean;
  priceline_oleh: string;
  masterbussiness?: IBusiness | null;
  masteritemuom?: IMasterItemUom | null;
}

/* 
  ENUM OF PRICE MODE
  1	harga tetap
  2	diskon dari harga standard dari mode 1
  3	naikkan dari harga beli akhir
  4	naikkan dari hpp
  5	margin dari beli akhir
  6	margin dari hpp
  7	bebas (terdapat pricemin dan pricemax)
*/