import type { IGeneralSettingCheck } from "./generalSettingCheck";
import type { IGeneralSettingDefault } from "./generalSettingDefault";
import type { IGeneralSettingPurchase } from "./generalSettingPurchase";
import type { IGeneralSettingSales } from "./generalSettingSales";

export interface IGeneralSettings {
  id: string;
  masterbussiness_id: string;
  generalsetting_metodehitung: "0" | "1" | "2" | "3";
  generalsetting_isautogeneratekodebarang: boolean;
  generalsetting_digitautogenerate: number;
  generalsetting_ismultimatauang: boolean;
  generalsetting_selisihwaktu: number;
  generalsetting_namaperusahaan: string | null;
  generalsetting_alamatperusahaan: string | null;
  generalsetting_kotaperusahaan: string | null;
  generalsetting_nomornpwp: string | null;
  generalsetting_namanpwp: string | null;
  generalsetting_alamatnpwp: string | null;
  generalsetting_tahunviskal: number | null;
  generalsetting_warna: string | null;
  generalsetting_oleh: string | null;
  generalsetting_waktu: number;
  generalsetting_check?: IGeneralSettingCheck | null;
  generalsetting_default?: IGeneralSettingDefault | null;
  generalsetting_purchase?: IGeneralSettingPurchase | null;
  generalsetting_sales?: IGeneralSettingSales | null;
}

/* ===============================================
  ENUM OF MODE HITUNG
  0	tidak hitung
  1	hitung AVG
  2	hitung FIFO
  3	hitung LIFO
*/