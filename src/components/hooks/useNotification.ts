import {
  useSnackbar,
  type OptionsObject,
  type SnackbarKey,
  type SnackbarMessage,
} from "notistack";

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setOpenNotification = (msg: SnackbarMessage, options?: OptionsObject) => {
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
      ...options,
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
