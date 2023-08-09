import type { IBusiness } from "@/types/cores/business";
import type { IMasterOther } from "../masterOther";

export interface IMasterPartnerEmployee {
  id: string;
  masterpartner_id: string;
  masterjabatan_id: string | null;
  masterbussiness_id: string;
  masterpartneremployee_statusptkp: string | null;
  masterpartneremployee_sex: string | null;
  masterpartneremployee_birthday: Date | null;
  masterpartneremployee_hiredate: number | null;
  masterpartneremployee_unhiredate: number | null;
  masterpartneremployee_posisi: string;
  masterpartneremployee_durasikerja: number;
  masterpartneremployee_benefit1: number;
  masterpartneremployee_benefit2: number;
  masterpartneremployee_benefit3: number;
  masterpartneremployee_benefit4: number;
  masterpartneremployee_benefit5: number;
  masterpartneremployee_deduction1: number;
  masterpartneremployee_deduction2: number;
  masterpartneremployee_deduction3: number;
  masterpartneremployee_deduction4: number;
  masterpartneremployee_deduction5: number;
  masterbussiness?: IBusiness | null;
  employee_position?: IMasterOther | null;
  description?: string | null;
  title?: string | null;
}
