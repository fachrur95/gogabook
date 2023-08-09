import type { IBusiness } from "@/types/cores/business";

export interface IMasterOtherPosition {
  id: string;
  masterother_id: string;
  masterbussiness_id: string;
  masterotherjabatan_issales: boolean;
  masterotherjabatan_isgrader: boolean;
  masterbussiness?: IBusiness | null;
}