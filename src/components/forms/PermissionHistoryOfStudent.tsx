import type {
  PermissionDetailWithIncludeParent,
  PermissionDetailWithParentResult,
} from "@/server/api/routers/permission";
import { api } from "@/utils/api";
import { dateConvert } from "@/utils/helpers";
import { useAppStore } from "@/utils/store";
import Refresh from "@mui/icons-material/Refresh";
import {
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { type MUIDataTableColumn } from "mui-datatables";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ModalTransition from "../dialogs/ModalTransition";
import DataTable from "../tables/datatables";

const PermissionHistoryOfStudent = () => {
  const {
    form: {
      permissionHistory: { open, id },
    },
    search,
    setFormClose,
  } = useAppStore();
  const { ref, inView } = useInView();
  const [rows, setRows] = useState<PermissionDetailWithIncludeParent[]>([]);
  const [sorting, setSorting] = useState<{
    column: string | undefined;
    direction: "asc" | "desc" | undefined;
  }>({ column: "outDate", direction: "desc" });

  const { data: count, refetch: refetchCount } =
    api.permission.countAllHistoryOfStudent.useQuery({
      id: id as string,
    });
  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
    api.permission.getHistoryOfStudent.useInfiniteQuery(
      {
        studentId: id as string,
        q: search,
        limit: 25,
        sorting,
      },
      {
        getNextPageParam: (lastPage: PermissionDetailWithParentResult) =>
          lastPage.nextCursor ?? undefined,
        enabled: !!id,
      }
    );

  const handleRefresh = useCallback(() => {
    void refetchCount();
    void refetch();
  }, [refetchCount, refetch]);

  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false, // Hide the column from the table view
        filter: false,
        viewColumns: false,
        print: false,
        download: false,
      },
    },
    {
      name: "imageProfileUrl",
      label: "Foto",
      options: {
        filterType: "textField",
        sort: false,
        filter: false,
        setCellHeaderProps: () => ({ className: "w-20" }),
        customBodyRenderLite: (dataIndex) => {
          const imgUrl = rows[dataIndex]?.student?.imageProfileUrl ?? "-";
          const name = rows[dataIndex]?.student?.fullName ?? "-";

          return <Avatar alt={name} src={imgUrl} />;
        },
      },
    },
    {
      name: "fullName",
      label: "Nama",
      options: {
        filterType: "textField",
        customBodyRenderLite: (dataIndex) => {
          const name = rows[dataIndex]?.student?.fullName ?? "-";

          return name;
        },
      },
    },
    {
      name: "dorm",
      label: "Asrama",
      options: {
        filterType: "textField",
        customBodyRenderLite: (dataIndex) => {
          const branch =
            rows[dataIndex]?.student?.dorm?.area?.branch?.name ?? "-";
          const area = rows[dataIndex]?.student?.dorm?.area?.name ?? "-";
          const dorm = rows[dataIndex]?.student?.dorm?.name ?? "-";
          return `${branch} ${area} ${dorm}`;
        },
      },
    },
    {
      name: "outDate",
      label: "Tanggal Izin",
      options: {
        filterType: "textField",
        customBodyRender: (value: Date, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const display = dateConvert(value);
          if (rowIndex === rows.length - 1) {
            return (
              <>
                <div className="invisible" ref={ref}></div>
                {display}
              </>
            );
          }
          return display;
        },
      },
    },
    {
      name: "inDate",
      label: "Tanggal Kembali",
      options: {
        filterType: "textField",
        customBodyRender: (value: Date) => {
          const display = value ? dateConvert(value) : "Belum Kembali";
          return display;
        },
      },
    },
    {
      name: "note",
      label: "Catatan",
    },
  ];

  const handleClose = () => void setFormClose("permissionHistory");

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const dataRows: PermissionDetailWithIncludeParent[] = data?.pages
        .map((page) =>
          page.rows.map((dorm: PermissionDetailWithIncludeParent) => dorm)
        )
        .flat();
      setRows(dataRows);
    }
  }, [data]);

  // if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  if (!id) {
    return null;
  }

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="lg"
      handleClose={handleClose}
    >
      <DialogTitle>{"Permission History"}</DialogTitle>
      <DialogContent dividers>
        <div className="text-right">
          <IconButton onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </div>
        <DataTable
          title={
            <div className="flex flex-row items-center gap-2">
              <Typography variant="h5" fontWeight={600}>
                Sejarah izin oleh santri
              </Typography>
              <Typography variant="subtitle2">{`(${
                count ?? 0
              } data)`}</Typography>
            </div>
          }
          isLoading={isLoading}
          data={rows}
          columns={columns}
          options={{
            count: count ?? 0,
            tableBodyHeight: "50vh",
            filter: false,
            selectableRowsHideCheckboxes: true,
            sortOrder: {
              name: sorting.column ?? "sequence",
              direction: sorting.direction ?? "asc",
            },
            onColumnSortChange(changedColumn, direction) {
              setSorting({ column: changedColumn, direction });
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <div></div>

        <div className="flex flex-row gap-2">
          <Button onClick={handleClose}>Close</Button>
        </div>
      </DialogActions>
    </ModalTransition>
  );
};

export default PermissionHistoryOfStudent;
