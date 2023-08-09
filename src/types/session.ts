import type { IMasterPartner } from "./masters/masterPartner";

export interface ISessionData {
  platform: string;
  fullName: string;
  username: string;
  email: string;
  package: string;
  isSuperUser: boolean;
  partner_id: string | null;
  isSuperAdmin: boolean;
  isAllTrans: boolean;
  isAllowHPP: boolean;
  isAllowSalesPrice: boolean;
  viewMode: boolean;
  privilege: string | null;
  privilegeDesc: string | null;
  business: string | null;
  businessDesc: string | null;
  store: string | null;
  storeDesc: string | null;
  warehouse: string | null;
  warehouseDesc: string | null;
  locked: boolean;
  partner: Partial<IMasterPartner> | null;
  telp: string | null;
  iat: number;
  exp: number;
}