export interface IBankStatementDetail {
  id: string;
  transbs_id: string;
  masterbussiness_id: string;
  transbsline_status: "P" | "C";
  transbsline_entrydate: number;
  transbsline_vector: number;
  transbsline_value: number;
  transbsline_saldo: number;
  transbsline_description: string;
  transbsline_waktu: number;
}
