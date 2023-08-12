import DeleteMultiple from "@/components/displays/DeleteMultiple";
import useMenuRole from "@/components/displays/useMenuRole";
import type { MyPage } from "@/components/layouts/layoutTypes";
import DataGridProAdv from "@/components/tables/datagrid/DataGridProAdv";
import { getServerAuthSession } from "@/server/auth";
import type { InfiniteQueryResult } from "@/types/api-response";
import type { ISessionData } from "@/types/session";
import type { ITransaction } from "@/types/transactions/trans";
import { api } from "@/utils/api";
import {
  convertDateOnly,
  convertOperator,
  convertRole,
  findNestedObj,
  formatNumber,
} from "@/utils/helpers";
import { useAppStore } from "@/utils/store";
import Close from "@mui/icons-material/Close";
import HourglassEmpty from "@mui/icons-material/HourglassEmpty";
import HourglassFull from "@mui/icons-material/HourglassFull";
import HourglassTop from "@mui/icons-material/HourglassTop";
import Layers from "@mui/icons-material/Layers";
import Refresh from "@mui/icons-material/Refresh";
import {
  Box,
  Chip,
  IconButton,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import type {
  GridColDef,
  GridFilterModel,
  GridInputSelectionModel,
  GridRenderCellParams,
  GridSelectionModel,
  GridSortModel,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
import jwtDecode from "jwt-decode";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { LoadingPage } from "@/components/layouts/LoadingPage";
// import useNotification from "@/components/displays/Notification";

const sortDefault: GridSortModel = [{ field: "trans_entrydate", sort: "desc" }];

const title = "Sales Delivery";
const path = "sales-delivery";

const tempPolicy: Record<string, boolean> = {
  list: false,
  view: false,
  insert: false,
  update: false,
  delete: false,
};

const SalesDeliveriesPage: MyPage<{ sessionData: ISessionData }> = ({
  sessionData,
}) => {
  const { data: menuRoles } = useMenuRole();
  const [rows, setRows] = useState<ITransaction[]>([]);
  const [policies, setPolicies] = useState<Record<string, boolean>>(tempPolicy);
  const [countAll, setCountAll] = useState<number>(0);
  const [sortModel, setSortModel] = useState<GridSortModel | undefined>(
    sortDefault
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel | undefined>(
    undefined
  );
  const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>(
    []
  );
  const [dataFilter, setDataFilter] = useState({ sortModel, filterModel });

  const { search } = useAppStore();
  // const { setOpenNotification } = useNotification();

  const {
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
  } = api.salesPurchase.getAll.useInfiniteQuery(
    {
      type: path,
      limit: 150,
      q: search,
      filter: JSON.stringify(dataFilter),
    },
    {
      getNextPageParam: (lastPage: InfiniteQueryResult<ITransaction>) =>
        typeof lastPage.currentPage === "number" && rows.length < countAll
          ? (lastPage.currentPage ?? 0) + 1
          : undefined,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "trans_text",
      headerName: "No. Transaction",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<unknown, ITransaction, unknown>
      ) => {
        const display = params.row.trans_text;
        if (sessionData.isSuperAdmin === false && policies.view !== true) {
          return display;
        }
        return (
          <Link
            href={{
              pathname: "/form/[[...slug]]",
              query: { slug: [params.row.id, "view"] },
            }}
          >
            <MuiLink component="button">{display}</MuiLink>
          </Link>
        );
      },
    },
    {
      field: "trans_order",
      headerName: "Order",
      type: "string",
      flex: 1,
      valueGetter: (params: GridValueGetterParams<unknown, ITransaction>) => {
        return params.row.trans_parent?.trans_text ?? "-";
      },
    },
    {
      field: "masterpartner_description",
      headerName: "Partner",
      type: "string",
      flex: 1,
      valueGetter: (params: GridValueGetterParams<unknown, ITransaction>) => {
        return params.row.trans_partner?.masterpartner_alias ?? "-";
      },
    },
    {
      field: "trans_total",
      headerName: "Total",
      flex: 1,
      type: "number",
      valueGetter: (params: GridValueGetterParams<unknown, ITransaction>) => {
        const nowValue = formatNumber(
          params.row.trans_totalvalue?.totalnilai ?? 0
        );
        return nowValue;
      },
    },
    {
      field: "trans_entrydate",
      headerName: "Tanggal",
      flex: 1,
      type: "date",
      valueGetter: (params: GridValueGetterParams<unknown, ITransaction>) => {
        const nowValue = convertDateOnly(params.row.trans_entrydate ?? 0);
        return nowValue;
      },
    },
    {
      field: "trans_status",
      headerName: "Status",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<unknown, ITransaction, unknown>
      ) => {
        const text = params.row.trans_totalvalue?.statustrans;
        return (
          <Chip
            icon={
              text === "FINISH" ? (
                <HourglassEmpty />
              ) : text === "PARTIAL" ? (
                <HourglassTop />
              ) : text === "CLOSED TRANS" ? (
                <Close />
              ) : text === "OVER" ? (
                <Layers />
              ) : (
                <HourglassFull />
              )
            }
            label={text}
            color={
              text === "FINISH"
                ? "success"
                : text === "PARTIAL"
                ? "secondary"
                : text === "CLOSED TRANS"
                ? "error"
                : text === "OVER"
                ? "warning"
                : "primary"
            }
          />
        );
      },
    },
    {
      field: "trans_oleh",
      headerName: "Oleh",
      type: "string",
      flex: 1,
      hide: true,
    },
  ];

  const handleSortChange = (params: GridSortModel) => {
    setSortModel(params);
  };

  const handleSelectionChange = (params: GridSelectionModel) => {
    setSelectionModel(params);
  };

  const handleFilterChange = (params: GridFilterModel) => {
    const items = params.items.filter((item) => {
      return item.value !== "" && item.value !== undefined;
    });
    const dataFilterModel = {
      items,
      linkOperator: params.linkOperator,
    };

    if (dataFilterModel.items) {
      if (dataFilterModel.items.length > 0) {
        const newFilter = convertOperator(dataFilterModel);
        setFilterModel({ ...dataFilterModel, items: newFilter });
      } else {
        setFilterModel(undefined);
      }
    }
  };

  useEffect(() => {
    if (menuRoles.length > 0) {
      const isSuperAdmin = sessionData.isSuperAdmin;
      if (isSuperAdmin) {
        return;
      }
      const selfPath = findNestedObj(menuRoles, path);
      if (!selfPath) {
        // return to core path;
        return;
      }
      const child = selfPath.children;
      const dataPolicies = convertRole(child);
      if (!dataPolicies) return;
      setPolicies(dataPolicies);
    }
  }, [menuRoles, sessionData]);

  useEffect(() => {
    if (data) {
      const dataRows: ITransaction[] = data?.pages
        .map((page) =>
          page.result.map((transaction: ITransaction) => transaction)
        )
        .flat();
      const dataCountAll: number = data.pages[0]?.countAll ?? 0;
      setRows(dataRows);
      setCountAll(dataCountAll);
    }
  }, [data]);

  useEffect(() => {
    setDataFilter({
      sortModel,
      filterModel,
    });
  }, [sortModel, filterModel]);

  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  // console.log({ hasNextPage });
  // if (isInitialLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>{`Gogabook | ${title}`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box className="flex flex-col gap-2">
        <Box
          component={Paper}
          elevation={4}
          className="relative w-full flex-grow p-4"
        >
          <Box className="mb-2 flex flex-col items-center md:flex-row md:justify-between">
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <div>
              <DeleteMultiple
                route="salesPurchase"
                ids={selectionModel as string[]}
                handleRefresh={() => void refetch()}
              />
              <IconButton onClick={() => void refetch()}>
                <Refresh />
              </IconButton>
            </div>
          </Box>
          <DataGridProAdv
            height="79vh"
            loading={isFetching}
            columns={columns}
            rows={rows}
            rowCount={countAll}
            /* onRowsScrollEnd={(params, params2, params3) => {
              console.log({ params, params2, params3 });
              fetchNextPage as DataGridProProps["onRowsScrollEnd"];
            }} */
            onRowsScrollEnd={() => hasNextPage && fetchNextPage()}
            filterMode="server"
            sortingMode="server"
            sortModel={sortModel}
            selectionModel={selectionModel}
            onSortModelChange={handleSortChange}
            onFilterModelChange={handleFilterChange}
            onSelectionModelChange={handleSelectionChange}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const accessToken = session.accessToken;
  const sessionData = jwtDecode<ISessionData>(accessToken);

  if (sessionData.business === null) {
    return {
      redirect: {
        destination: "/credentials/business",
        permanent: false,
      },
    };
  }

  if (sessionData.privilege === null) {
    return {
      redirect: {
        destination: "/credentials/privilege",
        permanent: false,
      },
    };
  }

  if (sessionData.store === null) {
    return {
      redirect: {
        destination: "/credentials/store",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      sessionData,
    },
  };
};

export default SalesDeliveriesPage;
SalesDeliveriesPage.Layout = "Dashboard";
