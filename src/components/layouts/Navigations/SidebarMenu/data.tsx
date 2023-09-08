import AccountBalance from "@mui/icons-material/AccountBalance";
import AssignmentReturn from "@mui/icons-material/AssignmentReturn";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import BuildCircleOutlined from "@mui/icons-material/BuildCircleOutlined";
import CallMadeOutlined from "@mui/icons-material/CallMadeOutlined";
import CallMergeOutlined from "@mui/icons-material/CallMergeOutlined";
import CallReceivedOutlined from "@mui/icons-material/CallReceivedOutlined";
import CallSplitOutlined from "@mui/icons-material/CallSplitOutlined";
import CircleOutlined from "@mui/icons-material/CircleOutlined";
import CompareArrowsOutlined from "@mui/icons-material/CompareArrowsOutlined";
import ContactsOutlined from "@mui/icons-material/ContactsOutlined";
import Factory from "@mui/icons-material/Factory";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import FormatQuote from "@mui/icons-material/FormatQuote";
import GroupAddOutlined from "@mui/icons-material/GroupAddOutlined";
import Hiking from "@mui/icons-material/Hiking";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";
import InsertChartOutlined from "@mui/icons-material/InsertChartOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";
import LocalActivityOutlined from "@mui/icons-material/LocalActivityOutlined";
import LocalAtmOutlined from "@mui/icons-material/LocalAtmOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import MenuBook from "@mui/icons-material/MenuBook";
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined";
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined";
import MoreOutlined from "@mui/icons-material/MoreOutlined";
import PaymentOutlined from "@mui/icons-material/PaymentOutlined";
import PriceChange from "@mui/icons-material/PriceChange";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import SaveAltOutlined from "@mui/icons-material/SaveAltOutlined";
import SettingsApplicationsOutlined from "@mui/icons-material/SettingsApplicationsOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import StorageOutlined from "@mui/icons-material/StorageOutlined";
import StorefrontOutlined from "@mui/icons-material/StorefrontOutlined";
import Undo from "@mui/icons-material/Undo";
import Groups from "@mui/icons-material/Groups";
import Diversity3 from "@mui/icons-material/Diversity3";
import Diversity2 from "@mui/icons-material/Diversity2";

export type DataMenuType = {
  id: string;
  label: string;
  depth: number;
  url: string;
  icon: React.ReactNode;
  children: DataMenuType[];
};

const data: DataMenuType[] = [
  {
    id: "dashboard",
    label: "dashboard",
    depth: 0,
    url: "/",
    icon: <InsertChartOutlined fontSize="small" />,
    children: [],
  },
  /* {
    id: "pos",
    label: "pos",
    depth: 0,
    url: "/pos",
    icon: <PointOfSale fontSize="small" />,
    children: [],
  }, */
  {
    id: "sales",
    label: "sales",
    depth: 0,
    url: "/sales",
    icon: <MonetizationOnOutlined fontSize="small" />,
    children: [
      {
        id: "sales-quotation",
        label: "quotation",
        depth: 1,
        url: "/sales/sales-quotations",
        icon: <FormatQuote fontSize="small" />,
        children: [],
      },
      {
        id: "sales-order",
        label: "order",
        depth: 1,
        url: "/sales/sales-orders",
        icon: <MenuBook fontSize="small" />,
        children: [],
      },
      {
        id: "sales-delivery",
        label: "delivery",
        depth: 1,
        url: "/sales/sales-deliveries",
        icon: <LocalShippingOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "sales-invoice",
        label: "invoice",
        depth: 1,
        url: "/sales/sales-invoices",
        icon: <AssignmentTurnedInOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "sales-return",
        label: "return",
        depth: 1,
        url: "/sales/sales-returns",
        icon: <AssignmentReturn fontSize="small" />,
        children: [],
      },
    ],
  },
  {
    id: "purchase",
    label: "purchase",
    depth: 0,
    url: "/purchase",
    icon: <ShoppingCartOutlined fontSize="small" />,
    children: [
      {
        id: "purchase-quotation",
        label: "quotation",
        depth: 1,
        url: "/purchase/purchase-quotations",
        icon: <FormatQuote fontSize="small" />,
        children: [],
      },
      {
        id: "purchase-order",
        label: "order",
        depth: 1,
        url: "/purchase/purchase-orders",
        icon: <MenuBook fontSize="small" />,
        children: [],
      },
      {
        id: "purchase-delivery",
        label: "delivery",
        depth: 1,
        url: "/purchase/purchase-deliveries",
        icon: <LocalShippingOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "purchase-invoice",
        label: "invoice",
        depth: 1,
        url: "/purchase/purchase-invoices",
        icon: <AssignmentTurnedInOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "purchase-return",
        label: "return",
        depth: 1,
        url: "/purchase/purchase-returns",
        icon: <Undo fontSize="small" />,
        children: [],
      },
    ],
  },
  {
    id: "cashandbank",
    label: "cash and bank",
    depth: 0,
    url: "/cashandbank",
    icon: <LocalAtmOutlined fontSize="small" />,
    children: [
      {
        id: "receivable-payments",
        label: "receivable",
        depth: 1,
        url: "/cashandbank/receivable-payments",
        icon: <SaveAltOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "payable-payments",
        label: "payable",
        depth: 1,
        url: "/cashandbank/payable-payments",
        icon: <PaymentOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "expenses",
        label: "cash out",
        depth: 1,
        url: "/cashandbank/expenses",
        icon: <CallMadeOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "other-incomes",
        label: "cash in",
        depth: 1,
        url: "/cashandbank/other-incomes",
        icon: <CallReceivedOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "transfer-funds",
        label: "transfer fund",
        depth: 1,
        url: "/cashandbank/transfer-funds",
        icon: <ImportExportOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "cheques",
        label: "cheques",
        depth: 1,
        url: "/cashandbank/cheques",
        icon: <LocalActivityOutlined fontSize="small" />,
        children: [
          /* {
            id: "cheques-customer",
            label: "customer",
            depth: 2,
            url: "/cashandbank/cheques/cheques-customer",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "cheques-supplier",
            label: "supplier",
            depth: 2,
            url: "/cashandbank/cheques/cheques-supplier",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          }, */
        ],
      },
      {
        id: "bank-reconciliation",
        label: "bank reconciliation",
        depth: 1,
        url: "/cashandbank/bank-reconciliation",
        icon: <AccountBalance fontSize="small" />,
        children: [],
      },
    ],
  },
  {
    id: "productions",
    label: "productions",
    depth: 0,
    url: "/productions",
    icon: <Factory fontSize="small" />,
    children: [
      {
        id: "assemble",
        label: "assembly",
        depth: 1,
        url: "/productions/assemble",
        icon: (
          <CallMergeOutlined
            fontSize="small"
            style={{ transform: "rotate(90deg)" }}
          />
        ),
        children: [
          /* {
            id: "assembly-quote",
            label: "quote",
            depth: 2,
            url: "/productions/assemble/assembly-quote",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "assembly-order",
            label: "order",
            depth: 2,
            url: "/productions/assemble/assembly-order",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "assembly-direct",
            label: "direct",
            depth: 2,
            url: "/productions/assemble/assembly-direct",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "assembly-mass-direct",
            label: "mass",
            depth: 2,
            url: "/productions/assemble/assembly-mass-direct",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          }, */
        ],
      },
      {
        id: "disassemble",
        label: "disassembly",
        depth: 1,
        url: "/productions/disassemble",
        icon: (
          <CallSplitOutlined
            fontSize="small"
            style={{ transform: "rotate(90deg)" }}
          />
        ),
        children: [
          /* {
            id: "disassembly-quote",
            label: "quote",
            depth: 2,
            url: "/productions/disassemble/disassembly-quote",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "disassembly-order",
            label: "order",
            depth: 2,
            url: "/productions/disassemble/disassembly-order",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "disassembly-direct",
            label: "direct",
            depth: 2,
            url: "/productions/disassemble/disassembly-direct",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          }, */
        ],
      },
    ],
  },
  {
    id: "inventories",
    label: "inventories",
    depth: 0,
    url: "/inventories",
    icon: <Inventory2Outlined fontSize="small" />,
    children: [
      {
        id: "stock-opname",
        label: "stock opname",
        depth: 1,
        url: "/inventories/stock-opname",
        icon: <ProductionQuantityLimits fontSize="small" />,
        children: [
          /* {
            id: "stock-instruction",
            label: "quote",
            depth: 2,
            url: "/inventories/stock-opname/stock-instructions",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "opname-count",
            label: "order",
            depth: 2,
            url: "/inventories/stock-opname/opname-counts",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "stock-adjustment",
            label: "direct",
            depth: 2,
            url: "/inventories/stock-opname/stock-adjustments",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          }, */
        ],
      },
      {
        id: "transfer-item",
        label: "transfer item",
        depth: 1,
        url: "/inventories/transfer-item",
        icon: <CompareArrowsOutlined fontSize="small" />,
        children: [
          /* {
            id: "transfer-item-quote",
            label: "quote",
            depth: 2,
            url: "/inventories/transfer-item/transfer-item-quote",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "transfer-item-order",
            label: "order",
            depth: 2,
            url: "/inventories/transfer-item/transfer-item-order",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          },
          {
            id: "transfer-item-direct",
            label: "direct",
            depth: 2,
            url: "/inventories/transfer-item/transfer-item-direct",
            icon: <CircleOutlined fontSize="small" />,
            children: [],
          }, */
        ],
      },
    ],
  },
  {
    id: "other",
    label: "other",
    depth: 0,
    url: "/other",
    icon: <MoreOutlined fontSize="small" />,
    children: [
      {
        id: "journal-entry",
        label: "journal entry",
        depth: 1,
        url: "/other/journal-entry",
        icon: <CircleOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "assets",
        label: "assets",
        depth: 1,
        url: "/other/assets",
        icon: <CircleOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "faktur",
        label: "faktur pajak",
        depth: 1,
        url: "/other/faktur",
        icon: <CircleOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "all-trans",
        label: "all transaction",
        depth: 1,
        url: "/other/all-trans",
        icon: <CircleOutlined fontSize="small" />,
        children: [],
      },
    ],
  },
  {
    id: "masters",
    label: "masters",
    depth: 0,
    url: "/",
    icon: <StorageOutlined fontSize="small" />,
    children: [
      {
        id: "products",
        label: "products",
        depth: 1,
        url: "/masters/products",
        icon: <LocalOfferOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "sales-purchases",
        label: "sales purchases",
        depth: 1,
        url: "/masters/sales-purchases",
        icon: <StorefrontOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "sales-prices",
        label: "sales prices",
        depth: 1,
        url: "/masters/sales-prices",
        icon: <PriceChange fontSize="small" />,
        children: [],
      },
      {
        id: "contacts",
        label: "contacts",
        depth: 1,
        url: "/masters/contacts",
        icon: <ContactsOutlined fontSize="small" />,
        children: [
          {
            id: "contact-customer",
            label: "Pelanggan",
            depth: 2,
            url: "/masters/contacts/customers",
            icon: <Groups fontSize="small" />,
            children: [],
          },
          {
            id: "contact-supplier",
            label: "Pemasok",
            depth: 2,
            url: "/masters/contacts/suppliers",
            icon: <Diversity3 fontSize="small" />,
            children: [],
          },
          {
            id: "contact-employee",
            label: "Karyawan",
            depth: 2,
            url: "/masters/contacts/employees",
            icon: <Diversity2 fontSize="small" />,
            children: [],
          },
        ],
      },
      {
        id: "accountings",
        label: "accountings",
        depth: 1,
        url: "/masters/accountings",
        icon: <FormatListNumberedOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "master-others",
        label: "others",
        depth: 1,
        icon: <MoreHorizOutlined fontSize="small" />,
        url: "/masters/master-others",
        children: [],
      },
    ],
  },
  {
    id: "reports",
    label: "reports",
    depth: 0,
    url: "/reports",
    icon: <ReceiptLongOutlined fontSize="small" />,
    children: [],
  },
  {
    id: "activities",
    label: "Aktivitas",
    depth: 0,
    url: "/activities",
    icon: <Hiking fontSize="small" />,
    children: [],
  },
  {
    id: "settings",
    label: "settings",
    depth: 0,
    url: "/settings",
    icon: <SettingsApplicationsOutlined fontSize="small" />,
    children: [
      {
        id: "users",
        label: "users",
        depth: 1,
        url: "/settings/users",
        icon: <GroupAddOutlined fontSize="small" />,
        children: [],
      },
      {
        id: "general-settings",
        label: "general settings",
        depth: 1,
        url: "/settings/general-settings",
        icon: <BuildCircleOutlined fontSize="small" />,
        children: [],
      },
      /* {
        id: "beginning-balance",
        label: "beginning balance",
        depth: 0,
        url: "/settings/beginning-balance",
        icon: <PlayCircleFilledWhiteOutlined fontSize="small" />,
        children: [],
      }, */
    ],
  },
];

export default data;
