import { useAppStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import CircularProgress, {
  type CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
  const { deleting } = useAppStore();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (deleting) {
      const all = deleting.processing;
      const outstanding = deleting.processed;

      const countProgress = (outstanding / all) * 100;
      if (isNaN(countProgress) === false) {
        setProgress(countProgress);
      }
    }
  }, [deleting]);

  if (progress === 0) return null;

  return <CircularProgressWithLabel value={progress} />;
};

export default DeletingProcess;
