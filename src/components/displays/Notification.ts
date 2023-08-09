import {
  useSnackbar,
  type OptionsObject,
  type SnackbarKey,
  type SnackbarMessage,
  type VariantType,
} from "notistack";

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setOpenNotification = (msg: SnackbarMessage, variant?: VariantType) => {
    const defaultValue = "Some error occurred!";
    const persistNotification = {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      persist: false,
      variant: "info",
    } as OptionsObject;

    return enqueueSnackbar(msg ?? defaultValue, {
      ...persistNotification,
      variant: variant,
    });
  };

  const setCloseNotification = (key: SnackbarKey) => {
    return closeSnackbar(key);
  };

  return {
    setOpenNotification,
    setCloseNotification,
  };
};

export default useNotification;
