import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import useNotification from "./Notification";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import Delete from "@mui/icons-material/Delete";

const DeleteMultiple = ({
  route,
  ids,
  handleRefresh,
}: {
  route: "salesPurchase";
  ids: string[];
  handleRefresh: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    deleting,
    setDeleting,
    setDeletingId,
    setDeleteCountAllProcess,
    setDeleteProcessed,
    resetDeleting,
  } = useAppStore();
  const mutation = api[route].delete.useMutation();
  const { setOpenNotification } = useNotification();

  const handleDelete = async () => {
    if (deleting.status) return;
    setDeletingId(ids);
    setOpen(false);
    setDeleteCountAllProcess(ids.length);
    setDeleting(true);

    try {
      // const allIds = deleting.ids;
      for (const id of ids) {
        await mutation.mutateAsync(
          { id },
          {
            onError: (err) => {
              console.log(err);
              setOpenNotification(err.message);
            },
            onSuccess: (data) => {
              setOpenNotification(data.message);
            },
          }
        );
        setDeleteProcessed();
      }
    } catch (error) {
      // Tangani error  yang terjadi selama penghapusan
      console.log({ error });
    } finally {
      resetDeleting();
      handleRefresh();
    }
  };

  if (ids.length === 0) return null;

  return (
    <>
      <LoadingButton
        onClick={() => setOpen(true)}
        loading={deleting.status}
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
