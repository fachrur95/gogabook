import React, { useContext, useEffect, useState } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppStore } from "@/utils/store";
import { api } from "@/utils/api";
import { DeleteWorkerEventType, IEventDeleteWorker } from "@/types/worker";
import { useSession } from "next-auth/react";
import useNotification from "@/components/displays/Notification";
import { WorkerContext } from "@/components/context/WorkerContext";
// import useNotification from "@/components/displays/Notification";
// import { useAppStore } from "@/utils/store";

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

// type RouteType = "procedure";

const DeletingProcess = () => {
  // const { deletingIds } = useAppStore();
  const { deleteWorker } = useContext(WorkerContext);
  // const mutation = api.procedure.delete.useMutation();

  const progress = 0;
  // const [route, setRoute] = useState<RouteType>("procedure");
  // const { setOpenNotification } = useNotification();
  // console.log({ deletingIds });

  useEffect(() => {
    /* const execute = async () => {
      const ids = deletingIds.procedure;
      await Promise.all(
        ids.map(async (id) => await mutation.mutateAsync({ id }))
      );
    };
    void execute(); */

    /* const ids = deletingIds.procedure;
    deleteWorker.postMessage({
      route: "procedure",
      path: "sales-order",
      data: ids,
    } as DeleteWorkerEventType); */
    if (deleteWorker) {
      deleteWorker.onmessage = (event: MessageEvent<IEventDeleteWorker>) => {
        console.log({ path: "process", event });
        // const dataEvent = event.data;
        // setOpenNotification(dataEvent.message, dataEvent.variant);
      };
    }
  }, [deleteWorker]);
  // }, [deletingIds, setOpenNotification]);

  if (progress === 0) return null;

  return <CircularProgressWithLabel value={progress} />;
};

export default DeletingProcess;
