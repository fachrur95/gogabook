import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import { LoadingButton } from "@mui/lab";
import React from "react";
import useNotification from "./Notification";

const DeleteMultiple = ({
  ids,
  handleRefresh,
}: {
  ids: string[];
  handleRefresh: () => void;
}) => {
  const {
    deleting,
    setDeleting,
    // setDeleteCountAllProcess,
    // setDeleteProcessed,
  } = useAppStore();
  const mutation = api.salesPurchase.delete.useMutation();
  const { setOpenNotification } = useNotification();

  const handleDelete = async () => {
    if (deleting.status) return;
    // setDeleteCountAllProcess(ids.length);
    setDeleting(true);

    try {
      for (const id of ids) {
        // setDeleteProcessed(index + 1);
        await mutation.mutateAsync(
          { id },
          {
            onError: (err) => {
              console.log(err);
              setOpenNotification(err.message);
            },
            onSuccess: (data) => {
              console.log(data);
              handleRefresh();
            },
          }
        );
      }
    } catch (error) {
      // Tangani error yang terjadi selama penghapusan
      console.log({ error });
    } finally {
      setDeleting(false);
      // setDeleteCountAllProcess(0);
      // setDeleteProcessed(0);
    }
  };

  return (
    <LoadingButton onClick={handleDelete} loading={deleting.status}>
      Delete
    </LoadingButton>
  );
};

export default DeleteMultiple;
