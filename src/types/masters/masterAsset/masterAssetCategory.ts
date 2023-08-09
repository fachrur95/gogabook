import type { IBusiness } from "@/types/cores/business";
import type { IPlatform } from "@/types/cores/platform";
import type { IMasterAccount } from "../masterChartOfAccount";

export interface IMasterAssetCategory {
  id: string;
  masterfixassetcategory_accountasset: string | null;
  masterfixassetcategory_accountexpense: string | null;
  masterfixassetcategory_accountaccumulation: string | null;
  masterfixassetcategory_accountkeuntungan: string | null;
  masterfixassetcategory_accountkerugian: string | null;
  masterfixassetcategory_accountperawatan: string | null;
  masterfixassetcategory_accountmasukan: string | null;
  masterfixassetcategory_accountkeluaran: string | null;
  masterplatform_id: string;
  masterbussiness_id: string;
  masterfixassetcategory_description: string;
  masterfixassetcategory_active: boolean;
  masterfixassetcategory_oleh: string;
  masterbussiness?: IBusiness | null;
  masterplatform?: IPlatform | null;
  fixassetcategory_accountasset?: IMasterAccount | null;
  fixassetcategory_accountexpense?: IMasterAccount | null;
  fixassetcategory_accountaccumulation?: IMasterAccount | null;
  fixassetcategory_accountkeuntungan?: IMasterAccount | null;
  fixassetcategory_accountkerugian?: IMasterAccount | null;
  fixassetcategory_accountperawatan?: IMasterAccount | null;
  fixassetcategory_accountmasukan?: IMasterAccount | null;
  fixassetcategory_accountkeluaran?: IMasterAccount | null;
}