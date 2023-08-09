import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";

export interface IMasterPartnerSupport {
  id: string;
  masterpartner_id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterpartnersupport_type: "1" | "2" | "3" | "4" | "5";
  masterpartnersupport_description: string | null;
  masterpartnersupport_blok: string | null;
  masterpartnersupport_nomor: string | null;
  masterpartnersupport_rt: string | null;
  masterpartnersupport_rw: string | null;
  masterpartnersupport_kecamatan: string | null;
  masterpartnersupport_kelurahan: string | null;
  masterpartnersupport_kabupaten: string | null;
  masterpartnersupport_provinsi: string | null;
  masterpartnersupport_kodepos: string | null;
  masterpartnersupport_active: boolean;
  masterpartnersupport_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  description?: string | null;
  title?: string | null;
}

/* 
  ENUM OF TYPES SUPPORT ****************
  1 alamat
  2 telp,email,fax
  3 kontak person
  4 rekening
  5 catatan
*/