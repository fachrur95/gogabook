// import { api } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useRef, useState } from "react";
// import useNotification from "./Notification";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Delete from "@mui/icons-material/Delete";
// import { useAppStore } from "@/utils/store";
import type { IEventDeleteWorker, WorkerPathType } from "@/types/worker";
import { useAppStore } from "@/utils/store";
import { DeletingType } from "@/utils/store/slices/appPersist";

const DeleteMultiple = ({
  route,
  path,
  ids,
}: {
  route: keyof DeletingType;
  path: WorkerPathType;
  ids: string[];
  handleRefresh?: () => void;
}) => {
  // const { data } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // const deleteWorker = useRef<Worker>();
  // const { setOpenNotification } = useNotification();
  // const mutation = api[route].delete.useMutation();
  const { setDeletingIds } = useAppStore();

  // console.log({ deleteWorker });

  const handleDelete = () => {
    setOpen(false);
    // setIsDeleting(true);
    console.log({ path });
    /* deleteWorker?.current?.postMessage({
      route,
      path,
      data: ids,
      token: data?.accessToken,
    } as DeleteWorkerEventType); */
    setDeletingIds(route, ids);
    // try {
    //   setIsDeleting(true);
    //   deleteWorker?.current?.postMessage({
    //     route,
    //     data: ids,
    //   });
    //   /* for (const id of ids) {
    //     await mutation.mutateAsync(
    //       { id },
    //       {
    //         onError: (err) => {
    //           console.log(err);
    //           setOpenNotification(err.message);
    //         },
    //         onSuccess: (data) => {
    //           setOpenNotification(data.message);
    //         },
    //       }
    //     );
    //   } */
    // } catch (error) {
    //   // Tangani error  yang terjadi selama penghapusan
    //   console.log({ error });
    // } finally {
    //   setIsDeleting(false);
    //   typeof handleRefresh === "function" && handleRefresh();
    // }
  };

  /* useEffect(() => {
    deleteWorker.current = new Worker(
      new URL("@/utils/workers/deleting.worker.ts", import.meta.url)
    );
    deleteWorker.current.onmessage = (
      event: MessageEvent<IEventDeleteWorker>
    ) => {
      console.log({ event });
    };
    return () => {
      deleteWorker.current?.terminate();
    };
  }, []); */

  if (ids.length === 0) return null;

  return (
    <>
      <LoadingButton
        onClick={() => setOpen(true)}
        loading={isDeleting}
        startIcon={<Delete />}
        color="error"
      >
        Delete
      </LoadingButton>
      <ConfirmationDialog
        open={open}
        title="Delete Confirmation"
        message="Are you sure to delete these?"
        onClose={() => setOpen(false)}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default DeleteMultiple;
