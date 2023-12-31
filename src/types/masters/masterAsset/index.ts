import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";

export interface IMasterAsset {
  id: string;
  masterfixasset_id: string;
  masterfixassetcategory_id: string;
  masterpartner_id: string | null;
  masterpartnerjual_id: string | null;
  masterstore_id: string | null;
  mastertax_id: string | null;
  mastertaxjual_id: string | null;
  mastercreditterm_id: string | null;
  mastercredittermjual_id: string | null;
  masteraccountbeli_id: string | null;
  masteraccountjual_id: string | null;
  trans_id: string;
  transjual_id: string;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterfixasset_description: string;
  masterfixasset_modepenyusutan: string;
  utput: string;
  masterfixasset_serialno: string;
  masterfixasset_tanggalperolehan: string;
  masterfixasset_tanggalmulaipenyusutan: string;
  masterfixasset_tanggalterjual: string;
  masterfixasset_taxrate: string;
  masterfixasset_taxratejual: string;
  masterfixasset_jangkawaktupenyusutan: string;
  masterfixasset_ratepenyusutan: string;
  masterfixasset_perolehanvalue: string;
  masterfixasset_susutvalue: string;
  masterfixasset_taxvalue: string;
  masterfixasset_taxvaluejual: string;
  masterfixasset_salvagevalue: string;
  masterfixasset_active: string;
  masterfixasset_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
}
