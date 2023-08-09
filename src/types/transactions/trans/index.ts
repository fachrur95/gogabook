import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterAsset } from "@/types/masters/masterAsset";
import type { IMasterAccount } from "@/types/masters/masterChartOfAccount";
import type { IMasterOther } from "@/types/masters/masterOther";
import type { IMasterPartner } from "@/types/masters/masterPartner";
import type { IMasterWarehouse } from "@/types/masters/masterWarehouse";
import type { ITransactionFakturDetail } from "../taxInvoice/taxInvoiceDetail";

export interface ITransaction {
  id: string;
  trans_id: string;
  transparent_id: string | null;
  masterwarehouse_id: string | null;
  masterstore_id: string | null;
  masteraccount_id: string | null;
  masterpartner_id: string | null;
  masterpartnerstaff_id: string | null;
  mastercreditterm_id: string | null;
  masterexpedisi_id: string | null;
  masterreason_id: string | null;
  masterwarehousetujuan_id: string | null;
  masterstoretujuan_id: string | null;
  masterexchange_id: string | null;
  masterfixasset_id: string | null;
  masterfixassetsusut_id: string | null;
  masterpartnersupport_id: string | null;
  transfakturline_id: string | null;
  masterplatform_id: string;
  masterbussiness_id: string;
  trans_text: string;
  trans_type: number;
  trans_status: "P" | "O" | "C" | "H" | "OD" | "CT";
  trans_entrydate: number;
  trans_tanggalnotapembelian: number;
  trans_nomorgiro: string | null;
  trans_girojatem: number | null;
  trans_girocair: number | null;
  trans_identitas: string | null;
  trans_nama: string | null;
  trans_telp: string | null;
  trans_email: string | null;
  trans_alamat: string | null;
  trans_description: string | null;
  trans_nomornota: string | null;
  trans_exchangevalue: number | null;
  trans_creditperiod: number | null;
  trans_discgroup: number | null;
  trans_isincludevat: boolean | null;
  trans_isdiscpersen: boolean | null;
  trans_isdiscpersendiscgroup: boolean | null;
  trans_isallocation: boolean | null;
  trans_syncstatus: number | null;
  trans_pemberidisc: string | null;
  trans_noresi: string | null;
  trans_mintafaktur: boolean | null;
  trans_isallowadditem: boolean | null;
  trans_isjumlahkan: boolean | null;
  trans_priceperpiece: boolean | null;
  trans_terupload: boolean | null;
  trans_oleh: string;
  trans_waktu: number;
  trans_olehubah: string;
  trans_waktuubah: number;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  masteraccount?: IMasterAccount | null;
  trans_store?: IMasterOther | null;
  trans_store_destination?: IMasterOther | null;
  trans_term?: IMasterOther | null;
  trans_expedition?: IMasterOther | null;
  trans_reason?: IMasterOther | null;
  trans_exchange?: IMasterOther | null;
  trans_warehouse?: IMasterWarehouse | null;
  trans_warehouse_destination?: IMasterWarehouse | null;
  trans_partner?: IMasterPartner | null;
  trans_staff?: IMasterPartner | null;
  trans_child?: ITransaction[];
  trans_parent?: ITransaction | null;
  trans_asset?: IMasterAsset | null;
  trans_address?: IMasterAsset | null;
  data_faktur?: ITransactionFakturDetail | null;
  description?: string | null;
  title?: string | null;
}
