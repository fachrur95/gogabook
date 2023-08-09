import type { IBusiness } from "@/types/cores/business";
import type { IMasterAsset } from ".";
import type { ITransaction } from "@/types/transactions/trans";

export interface IMasterAssetDecrease {
  id: string;
  masterfixassetsusut_id: string;
  masterfixasset_id: string;
  trans_id: string | null;
  masterbussiness_id: string;
  masterfixassetsusut_text: string | null;
  masterfixassetsusut_type: number;
  masterfixassetsusut_depreciationdate: number;
  masterfixassetsusut_depreciationvalue: number;
  masterfixassetsusut_active: boolean;
  masterfixassetsusut_oleh: string;
  masterbussiness?: IBusiness | null;
  masterfixasset?: IMasterAsset | null;
  trans?: ITransaction | null;
}
