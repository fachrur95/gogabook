import type { IBusiness } from "@/types/cores/business";

export interface IMasterOtherDuration {
  id: string;
  masterother_id: string;
  masterbussiness_id: string;
  masterotherdurasi_sellquoteubahdurasimenit: number;
  masterotherdurasi_sellorderdurasimenit: number;
  masterotherdurasi_selldeliveryubahdurasimenit: number;
  masterotherdurasi_sellubahdurasimenit: number;
  masterotherdurasi_sellreturubahdurasimenit: number;
  masterotherdurasi_sellpelunasanpiutangubahdurasimenit: number;
  masterotherdurasi_purchquoteubahdurasimenit: number;
  masterotherdurasi_purchorderdurasimenit: number;
  masterotherdurasi_purchdeliveryubahdurasimenit: number;
  masterotherdurasi_purchubahdurasimenit: number;
  masterotherdurasi_purchreturubahdurasimenit: number;
  masterotherdurasi_purchpelunasanpiutangubahdurasimenit: number;
  masterotherdurasi_assemblyquoteubahdurasimenit: number;
  masterotherdurasi_assemblyorderdurasimenit: number;
  masterotherdurasi_assemblyubahdurasimenit: number;
  masterotherdurasi_disassemblyquoteubahdurasimenit: number;
  masterotherdurasi_disassemblyorderdurasimenit: number;
  masterotherdurasi_disassemblyubahdurasimenit: number;
  masterotherdurasi_transfergudangquoteubahdurasimenit: number;
  masterotherdurasi_transfergudangorderdurasimenit: number;
  masterotherdurasi_transfergudangubahdurasimenit: number;
  masterotherdurasi_jurnalumumubahdurasimenit: number;
  masterotherdurasi_aruskeluarubahdurasimenit: number;
  masterotherdurasi_arusmasukubahdurasimenit: number;
  masterotherdurasi_setoranubahdurasimenit: number;
  masterbussiness?: IBusiness | null;
}