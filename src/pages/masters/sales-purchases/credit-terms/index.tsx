import DeleteMultiple from "@/components/displays/DeleteMultiple";
import useMenuRole from "@/components/hooks/useMenuRole";
import type { MyPage } from "@/components/layouts/layoutTypes";
import DataGridProAdv from "@/components/tables/datagrid/DataGridProAdv";
import { getServerAuthSession } from "@/server/auth";
import type { InfiniteQueryResult } from "@/types/api-response";
import type { ISessionData } from "@/types/session";
import { api } from "@/utils/api";
import { convertOperator, convertRole, findNestedObj } from "@/utils/helpers";
import { useAppStore } from "@/utils/store";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Refresh from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import {
  Box,
  Button,
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
} from "@mui/x-data-grid-pro";
import jwtDecode from "jwt-decode";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { LoadingPage } from "@/components/layouts/LoadingPage";
// import useNotification from "@/components/hooks/useNotification";
import CustomMenu from "@/components/displays/StyledMenu";
import type { WorkerPathType } from "@/types/worker";
import NavTabs from "@/components/tabs";
import { salesPurchaseTabs } from "@/components/tabs/data";
import type { IMasterOther } from "@/types/masters/masterOther";

const sortDefault: GridSortModel = [
  { field: "masterother_description", sort: "asc" },
];

const title = "Master Credit Terms";
const path: WorkerPathType = "term";

const tempPolicy: Record<string, boolean> = {
  list: false,
  view: false,
  insert: false,
  update: false,
  delete: false,
};

const MasterCreditTermPage: MyPage<{ sessionData: ISessionData }> = ({
  sessionData,
}) => {
  const { data: menuRoles } = useMenuRole();
  const [rows, setRows] = useState<IMasterOther[]>([]);
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
  } = api.masterOther.getAll.useInfiniteQuery(
    {
      type: path,
      limit: 150,
      q: search,
      filter: JSON.stringify(dataFilter),
    },
    {
      getNextPageParam: (lastPage: InfiniteQueryResult<IMasterOther>) =>
        typeof lastPage.currentPage === "number" && rows.length < countAll
          ? (lastPage.currentPage ?? 0) + 1
          : undefined,
    }
  );

  const columns: GridColDef[] = [
    {
      field: "masterother_description",
      headerName: "Name",
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<unknown, IMasterOther, unknown>
      ) => {
        const display = params.row.masterother_description;
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
      field: "masterother_active",
      headerName: "Aktif",
      type: "boolean",
      filterable: false,
      flex: 1,
      renderCell: (
        params: GridRenderCellParams<unknown, IMasterOther, unknown>
      ) => (
        <Chip
          icon={params.row.masterother_active ? <Done /> : <Close />}
          label={params.row.masterother_active ? "Aktif" : "Non-Aktif"}
          color={params.row.masterother_active ? "primary" : "secondary"}
        />
      ),
    },
    {
      field: "masterother_oleh",
      headerName: "Oleh",
      type: "string",
      flex: 1,
      hide: true,
    },
    {
      field: "actions",
      type: "actions",
      width: 80,
      renderCell: (
        params: GridRenderCellParams<unknown, IMasterOther, unknown>
      ) => {
        const id = params.row.id;
        return (
          <CustomMenu
            id={id}
            menus={[
              {
                icon: <EditIcon />,
                label: "Edit",
                onClick: (params) => console.log(params),
              },
              {
                icon: <FileCopyIcon />,
                label: "Duplicate",
                onClick: (params) => console.log(params),
              },
              { label: "divider" },
              {
                icon: <ArchiveIcon />,
                label: "Archive",
                onClick: (params) => console.log(params),
              },
              {
                icon: <MoreHorizIcon />,
                label: "More",
                onClick: (params) => console.log(params),
              },
            ]}
          />
        );
      },
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
      const dataRows: IMasterOther[] = data?.pages
        .map((page) =>
          page.result.map((transaction: IMasterOther) => transaction)
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
        <NavTabs data={salesPurchaseTabs} />
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
                route="procedure"
                path={path}
                ids={selectionModel as string[]}
                handleRefresh={() => void refetch()}
              />
              <IconButton onClick={() => void refetch()}>
                <Refresh />
              </IconButton>
              <Button variant="contained" endIcon={<Add />}>
                Create New
              </Button>
            </div>
          </Box>
          <DataGridProAdv
            height="73vh"
            loading={isFetching}
            columns={columns}
            rows={rows}
            rowCount={countAll}
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

export default MasterCreditTermPage;
MasterCreditTermPage.Layout = "Dashboard";
