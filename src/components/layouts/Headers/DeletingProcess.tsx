import React, { useEffect } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppStore } from "@/utils/store";
import useNotification from "@/components/displays/Notification";
// import useNotification from "@/components/displays/Notification";

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
  const { toast, deletingProcess } = useAppStore();
  const { setOpenNotification } = useNotification();
  // let snackbarId: string | number;

  // const progress = 0;

  useEffect(() => {
    if (toast.message !== "" && toast.message !== "done") {
      setOpenNotification(toast.message, toast.variant);
    }
  }, [toast, setOpenNotification]);

  if (deletingProcess === 0) return null;

  return (
    <div className="flex flex-row items-center gap-2">
      <Typography variant="subtitle2">Deleting ...</Typography>
      <CircularProgressWithLabel value={deletingProcess} />
    </div>
  );
};

export default DeletingProcess;
