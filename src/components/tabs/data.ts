export interface IDataTab {
  id: string;
  label: string;
  url: string;
}

export const chequeTabs: IDataTab[] = [
  {
    id: "cheques-customer",
    label: "Customer",
    url: "/cashandbank/cheques/cheques-customer",
  },
  {
    id: "cheques-supplier",
    label: "Supplier",
    url: "/cashandbank/cheques/cheques-supplier",
  },
];

export const assemblyTabs: IDataTab[] = [
  {
    id: "assembly-direct",
    label: "Direct",
    url: "/productions/assemble/assembly-direct",
  },
  {
    id: "assembly-order",
    label: "Order",
    url: "/productions/assemble/assembly-order",
  },
  {
    id: "assembly-quote",
    label: "Quote",
    url: "/productions/assemble/assembly-quote",
  },
  {
    id: "assembly-mass-direct",
    label: "Mass",
    url: "/productions/assemble/assembly-mass-direct",
  },
];

export const disassemblyTabs: IDataTab[] = [
  {
    id: "disassembly-direct",
    label: "Direct",
    url: "/productions/disassemble/disassembly-direct",
  },
  {
    id: "disassembly-order",
    label: "Order",
    url: "/productions/disassemble/disassembly-order",
  },
  {
    id: "disassembly-quote",
    label: "Quote",
    url: "/productions/disassemble/disassembly-quote",
  },
];

export const transferItemTabs: IDataTab[] = [
  {
    id: "transfer-item-direct",
    label: "Direct",
    url: "/inventories/transfer-item/transfer-item-direct",
  },
  {
    id: "transfer-item-order",
    label: "Order",
    url: "/inventories/transfer-item/transfer-item-order",
  },
  {
    id: "transfer-item-quote",
    label: "Quote",
    url: "/inventories/transfer-item/transfer-item-quote",
  },
];

export const stockAdjustmentTabs: IDataTab[] = [
  {
    id: "stock-instruction",
    label: "Instruction",
    url: "/inventories/stock-opname/stock-instructions",
  },
  {
    id: "opname-count",
    label: "Opname Count",
    url: "/inventories/stock-opname/opname-counts",
  },
  {
    id: "stock-adjustment",
    label: "Adjustment",
    url: "/inventories/stock-opname/stock-adjustments",
  },
];