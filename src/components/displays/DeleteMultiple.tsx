// import { api } from "@/utils/api";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useEffect, useRef, useState } from "react";
// import useNotification from "./Notification";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Delete from "@mui/icons-material/Delete";
// import { useAppStore } from "@/utils/store";
import type {
  DeleteWorkerEventType,
  IEventDeleteWorker,
  WorkerPathType,
} from "@/types/worker";
import { useAppStore } from "@/utils/store";
import { DeletingType } from "@/utils/store/slices/appPersist";
import { WorkerContext } from "../context/WorkerContext";

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
  const { deleteWorker } = useContext(WorkerContext);
  // const { setOpenNotification } = useNotification();
  // const mutation = api[route].delete.useMutation();
  // const { setDeletingIds } = useAppStore();

  // console.log({ deleteWorker });

  const handleDelete = () => {
    setOpen(false);
    deleteWorker?.postMessage({
      route,
      path,
      data: ids,
    } as DeleteWorkerEventType);
  };

  useEffect(() => {
    if (deleteWorker) {
      deleteWorker.onmessage = (event: MessageEvent<IEventDeleteWorker>) => {
        console.log({ path: "execute", event });
      };
    }
  }, [deleteWorker]);

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
