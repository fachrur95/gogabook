import type { IGeneralSettings } from "./generalSettings";

export interface IBusiness {
  id: string;
  masterindustri_id: string;
  mastertipeusaha_id: string;
  masterjumlahkaryawan_id: string;
  masterbussiness_endbilling: number | null;
  masterbussiness_jumuser: number | null;
  masterbussiness_active: boolean;
  masterbussiness_oleh: string;
  generalsetting?: IGeneralSettings;
}