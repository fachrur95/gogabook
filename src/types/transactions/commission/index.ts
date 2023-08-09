import type { ICommissionDetail } from "./commissionDetail";

export interface ICommission {
  id: string;
  masterbussiness_id: string;
  komisi_description: string | null;
  komisi_startdate: number | null;
  komisi_enddate: number | null;
  komisi_typesales: "Semua" | "Tertentu";
  komisi_typeitem: 'Semua' | 'Kategori' | 'Barang';
  komisi_typecustomer: 'Semua' | 'Kategori' | 'Pelanggan' | 'UsiaPelanggan';
  komisi_ispersentase: boolean;
  komisi_ketentuan: 'PerFaktur' | 'PerQty' | 'NilaiPenjualan' | 'LabaKotor';
  komisi_usiapelanggan: number;
  komisi_usiafrom: 'Order' | 'Invoice' | 'Master';
  commission_detail?: ICommissionDetail[];
}
