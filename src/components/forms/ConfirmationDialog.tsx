import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ModalTransition from "../dialogs/ModalTransition";

interface ConfirmationDialog {
  title?: string;
  message?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmationDialog = ({
  title,
  message,
  open,
  onClose,
  onSubmit,
}: ConfirmationDialog) => {
  return (
    <ModalTransition open={open}>
      <DialogTitle>{title ?? "Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message ?? `Are you sure!`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Discard</Button>
        <Button variant="contained" color="error" onClick={onSubmit}>
          Confirm
        </Button>
      </DialogActions>
    </ModalTransition>
  );
};

export default ConfirmationDialog;
