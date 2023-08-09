import { LoadingPage } from "@/components/layouts/LoadingPage";
import { useAppStore } from "@/utils/store";
import MUIDataTable, {
  type MUIDataTableColumn,
  type MUIDataTableOptions,
  type MUIDataTableProps,
  type MUIDataTableState,
} from "mui-datatables";
import * as React from "react";

interface Props extends Omit<MUIDataTableProps, "columns"> {
  columns: MUIDataTableColumn[];
  isLoading?: boolean;
}

const DataTable: React.FC<Props> = ({ isLoading, options, ...props }) => {
  const tableRef = React.useRef<
    React.Component<MUIDataTableProps, MUIDataTableState> | null | undefined
  >();
  const { setSearch } = useAppStore();

  const defaultOptions: MUIDataTableOptions = {
    filterType: "textField",
    pagination: false,
    serverSide: true,
    onSearchChange: (searchText) => void setSearch(searchText ?? ""),
    textLabels: {
      body: {
        noMatch: isLoading ? (
          <LoadingPage />
        ) : (
          "Sorry, there is no matching data to display"
        ),
      },
    },
    // search: true,
    // download: true,
    // print: true,
    // viewColumns: true,
    // filter: true,
    // responsive: "vertical",
    // resizableColumns: true,
    /* onTableChange: (action, state) => {
      console.log({ action });
      console.dir({ state });
    }, */
  };

  return (
    <div>
      <MUIDataTable
        innerRef={tableRef}
        options={{ ...defaultOptions, ...options }}
        {...props}
      />
    </div>
  );
};

export default DataTable;
