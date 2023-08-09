import Dialog, { type DialogProps } from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { type FC } from "react";

interface ModalTransitionProps extends DialogProps {
  open: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
  // width?: number;
}

const ModalTransition: FC<ModalTransitionProps> = ({
  open,
  handleClose,
  children,
  ...props
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      {...props}
    >
      {children}
    </Dialog>
  );
};

export default ModalTransition;
