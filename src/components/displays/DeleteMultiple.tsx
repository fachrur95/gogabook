import { api } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useRef, useState } from "react";
import useNotification from "./Notification";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Delete from "@mui/icons-material/Delete";
import { useAppStore } from "@/utils/store";
import { IEventDeleteWorker } from "@/types/worker";

const DeleteMultiple = ({
  route,
  ids,
  handleRefresh,
}: {
  route: "salesPurchase";
  ids: string[];
  handleRefresh?: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deleteWorker = useRef<Worker>();
  // const { setOpenNotification } = useNotification();
  // const mutation = api[route].delete.useMutation();
  // const { deleteWorker } = useAppStore();

  // console.log({ deleteWorker });

  const handleDelete = () => {
    setOpen(false);
    // setIsDeleting(true);
    console.log({ deleteWorker });
    deleteWorker?.current?.postMessage({
      route,
      data: ids,
    });
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

  useEffect(() => {
    deleteWorker.current = new Worker(
      new URL("@/utils/workers/deleting.worker.ts", import.meta.url)
    );
    deleteWorker.current.onmessage = (
      event: MessageEvent<IEventDeleteWorker>
    ) => {
      console.log({ event });
    };
  }, []);

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
