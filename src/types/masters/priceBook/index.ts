import type { IBusiness } from "@/types/cores/business";
import type { IPriceBookDetail } from "./priceBookDetail";
import type { IPriceBookPartnerCategory } from "./priceBookPartnerCategory";
import type { IPriceBookStore } from "./priceBookStore";

export interface IPriceBook {
  id: string;
  masterbussiness_id: string;
  price_description: string;
  price_mode: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  price_ispersen: boolean;
  price_start: number;
  price_end: number;
  price_default: boolean;
  price_issemuastore: boolean;
  price_issemuapartnercategory: boolean;
  price_active: boolean;
  price_oleh: string;
  masterbussiness?: IBusiness | null;
  pricelines?: IPriceBookDetail[];
  price_partnercategory?: IPriceBookPartnerCategory[];
  price_store?: IPriceBookStore[];
  description?: string | null;
  title?: string | null;
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