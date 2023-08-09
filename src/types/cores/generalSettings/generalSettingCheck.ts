import type { IGeneralSettings } from ".";

export interface IGeneralSettingCheck {
  id: string;
  generalsettingcek_id: string;
  generalsetting_id: string;
  masterbussiness_id: string;
  generalsettingcek_qtytarikquoteorderbeli: number;
  generalsettingcek_qtytarikorderfakturrbeli: number;
  generalsettingcek_qtytarikquoteorderjual: number;
  generalsettingcek_qtytarikorderfakturjual: number;
  generalsettingcek_qtytarikquoteorderasembly: number;
  generalsettingcek_qtytarikorderfakturasembly: number;
  generalsettingcek_qtytarikquoteorderdisasembly: number;
  generalsettingcek_qtytarikorderfakturdisasembly: number;
  generalsettingcek_qtytarikquoteordertransfer: number;
  generalsettingcek_qtytarikorderfakturtransfer: number;
  generalsettingcek_alokasidefaultquotebeli: number;
  generalsettingcek_alokasidefaultquotejual: number;
  generalsettingcek_alokasidefaultquotetransfer: number;
  generalsettingcek_alokasidefaultquotekoreksi: number;
  generalsettingcek_alokasidefaultquoteassembly: number;
  generalsettingcek_alokasidefaultquotedissasembly: number;
  generalsettingcek_alokasidefaultorderbeli: number;
  generalsettingcek_alokasidefaultorderjual: number;
  generalsettingcek_alokasidefaultordertransfer: number;
  generalsettingcek_alokasidefaultorderkoreksi: number;
  generalsettingcek_alokasidefaultorderassembly: number;
  generalsettingcek_alokasidefaultorderdissasembly: number;
  generalsettingcek_stok: "0" | "1" | "2";
  generalsetting?: IGeneralSettings | null;
}

/* 
  ENUM OF CHECK STOCK
  0 tanpa cek
  1 cek stok inhand
  2 cek stok alokasi
*/