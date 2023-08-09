import type { IBusiness } from "@/types/cores/business";

export interface IMasterPartnerTaxation {
  id: string;
  masterpartnerpajak_id: string;
  masterpartner_id: string;
  masterbussiness_id: string;
  masterpartnerpajak_nomornpwp: string | null;
  masterpartnerpajak_namanpwp: string | null;
  masterpartnerpajak_alamatnpwp: string | null;
  masterpartnerpajak_blok: string | null;
  masterpartnerpajak_nomor: string | null;
  masterpartnerpajak_rt: string | null;
  masterpartnerpajak_rw: string | null;
  masterpartnerpajak_kecamatan: string | null;
  masterpartnerpajak_kelurahan: string | null;
  masterpartnerpajak_kabupaten: string | null;
  masterpartnerpajak_provinsi: string | null;
  masterpartnerpajak_kodepos: string | null;
  masterpartnerpajak_opsifaktur: "KTP" | "NPWP" | "BELUM DI ATUR";
  masterbussiness?: IBusiness | null;
}
