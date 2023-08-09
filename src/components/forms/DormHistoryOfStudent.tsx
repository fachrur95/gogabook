import { api } from "@/utils/api";
import { dateConvert } from "@/utils/helpers";
import { useAppStore } from "@/utils/store";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ModalTransition from "../dialogs/ModalTransition";

const DormHistoryOfStudent = () => {
  const {
    form: {
      dormHistory: { open, id },
    },
    setFormClose,
  } = useAppStore();

  const { data } = api.student.getDormHistory.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const handleClose = () => void setFormClose("dormHistory");

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="sm"
      handleClose={handleClose}
    >
      <DialogTitle>{"Dorm History"}</DialogTitle>
      <DialogContent dividers>
        <Timeline position="alternate">
          {data?.map((history, index) => (
            <TimelineItem key={history.id}>
              <TimelineOppositeContent color="text.secondary">
                {dateConvert(history.createdAt, { dateStyle: "medium" })}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{`${history.dorm.area.branch.name} ${
                history.dorm.area.name
              } ${history.dorm.name} (${
                index === 0 ? "Masuk" : "Pindah"
              })`}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
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

export default DormHistoryOfStudent;
