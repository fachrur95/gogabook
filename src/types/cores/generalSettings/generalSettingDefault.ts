import type { IGeneralSettings } from ".";

export interface IGeneralSettingDefault {
  id: string;
  generalsettingdefault_id: string;
  generalsetting_id: string;
  masterbussiness_id: string;
  generalsettingdefault_masteruom_id: string | null;
  generalsettingdefault_mastertax_id: string | null;
  generalsettingdefault_masteritemcategory_id: string | null;
  generalsettingdefault_mastercreditterm_id: string | null;
  generalsettingdefault_exchangecode_id: string | null;
  generalsettingdefault_saldolababerjalan_id: string | null;
  generalsettingdefault_saldolabaditahan_id: string | null;
  generalsettingdefault_persediaan_id: string | null;
  generalsettingdefault_hpp_id: string | null;
  generalsettingdefault_penjualan_id: string | null;
  generalsettingdefault_returpenjualan_id: string | null;
  generalsettingdefault_discpenjualan_id: string | null;
  generalsettingdefault_vatmasuk_id: string | null;
  generalsettingdefault_vatkeluar_id: string | null;
  generalsettingdefault_asset_id: string | null;
  generalsettingdefault_assetexpense_id: string | null;
  generalsettingdefault_assetakumulasi_id: string | null;
  generalsettingdefault_assetkeuntungan_id: string | null;
  generalsettingdefault_assetkerugian_id: string | null;
  generalsettingdefault_assetperawatan_id: string | null;
  generalsettingdefault_assetppnmasuk_id: string | null;
  generalsettingdefault_assetppnkeluar_id: string | null;
  generalsetting?: IGeneralSettings | null;
}
