export interface IMasterPrefix {
  id: string;
  masterprefix_id: string;
  // masterbussiness_id: string;
  masterprefix_prefix: string;
  masterprefix_digit: number;
  masterprefix_type: number;
  masterprefix_kelompok: "PEMBELIAN" | "SALDO AWAL" | "PENJUALAN" | "INVENTORY" | "PRODUCTION" | "AKTIVA TETAP" | "JURNAL";
  masterprefix_description: string;
  // masterbussiness?: IBusiness | null;
  description?: string | null;
  title?: string | null;
}
