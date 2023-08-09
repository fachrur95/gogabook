import type { IMasterAccountClass } from "./masterAccountClass";

export interface IMasterAccountSubClass {
  id: string;
  masteraccountclass_id: string;
  masteraccountsubclass_cashflow: string;
  masteraccountsubclass_subcashflow: string;
  masteraccountsubclass_description: string;
  masteraccountsubclass_alias: string;
  masteraccountsubclass_active: boolean;
  masteraccountsubclass_oleh: string;
  masteraccountclass?: IMasterAccountClass | null;
  description?: string | null;
  title?: string | null;
}
