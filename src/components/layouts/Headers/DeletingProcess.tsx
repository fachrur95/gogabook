import { useAppStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useNotification from "@/components/displays/Notification";
import { api } from "@/utils/api";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const DeletingProcess = () => {
  const { deletingStatus, setDeletingStatus, deletingIds, removeDeletingId } =
    useAppStore();
  const [progress, setProgress] = useState<number>(0);
  const { setOpenNotification } = useNotification();
  const mutation = api.salesPurchase.delete.useMutation();

  useEffect(() => {
    // if (deletingStatus !== "idle" ) return;
    if (deletingIds.length > 0) {
      // setDeletingStatus("running");
      // const all = deletingIds.length;
      // for (const id of deletingIds) {
      const currentId = deletingIds[0];
      if (!currentId) return;
      const executeDelete = async () => {
        await mutation.mutateAsync(
          { id: currentId },
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
        removeDeletingId(currentId);
        // setDeletingStatus("done");
      };
      void executeDelete();
      // const countProgress = (counter / all) * 100;
      // if (isNaN(countProgress)) {
      //   return setProgress(0);
      // }
      // setProgress(countProgress);
      // }
      // resetDeletingIds();
    }
  }, [
    deletingStatus,
    setDeletingStatus,
    deletingIds,
    removeDeletingId,
    mutation,
    setOpenNotification,
  ]);

  /* useEffect(() => {
    if (notificationMessage) {
      setOpenNotification(notificationMessage);
    }
  }, [notificationMessage, setOpenNotification]); */

  if (progress === 0) return null;

  return <CircularProgressWithLabel value={progress} />;
};

export default DeletingProcess;
