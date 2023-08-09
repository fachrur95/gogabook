export interface IMasterAccountClass {
  id: string;
  masteraccountclass_categoryclass: "FIXED ASSET" | "CURRENT ASSET" | "LONG TERM LIABILITIES" | "CURRENT LIABILITIES" | "EQUITY" | "NET PROFIT" | "REVENUE" | "COGS" | "COGM" | "EXPENSE" | "OTHER REVENUE" | "OTHER EXPENSE" | "TAX";
  masteraccountclass_categoryclasscode: number;
  masteraccountclass_description: string;
  masteraccountclass_alias: string;
  masteraccountclass_neraca: number;
  masteraccountclass_profitloss: number;
  masteraccountclass_active: boolean;
  masteraccountclass_oleh: string;
  description?: string | null;
  title?: string | null;
}
