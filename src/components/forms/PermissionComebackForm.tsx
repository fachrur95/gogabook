import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { PermissionDetail } from "@prisma/client";
import { FormContainer, useForm } from "react-hook-form-mui";
import DateTimePickerWithHijri from "../controls/DateTimePickerWithHijri";
import ModalTransition from "../dialogs/ModalTransition";

export type AutocompleteOptions = {
  id: string;
  label: string;
  imageUrl: string;
};

export type PermissionDetailFormType = Pick<PermissionDetail, "inDate">;

const defaultValues: PermissionDetailFormType = {
  inDate: new Date(),
};

const PermissionComebackForm = () => {
  const {
    form: {
      permissionComeback: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<PermissionDetailFormType>({ defaultValues });

  const {
    formState: { isSubmitting },
    setError,
    watch,
  } = formContext;

  const selectedDate = watch("inDate");

  const { data: dataView } = api.permission.getUniqueDetail.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const handleClose = () => {
    void setFormClose("permissionComeback");
    void setFormClose("permissionDetail");
  };

  const mutationUpdate = api.permission.comebackDetail.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof PermissionDetailFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const onSubmit = (data: PermissionDetailFormType) => {
    // console.log({ data });
    if (dataView && id) {
      return void mutationUpdate.mutate({
        ...data,
        inDate: data.inDate ? data.inDate : new Date(),
        id,
      });
    }
  };

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="xs"
      handleClose={handleClose}
    >
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <DialogTitle>{"Kembali"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-4">
            <DateTimePickerWithHijri
              selectedDate={selectedDate}
              name="inDate"
              label="Tanggal Kembali"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            <div></div>
            <div className="flex flex-row gap-2">
              <Button onClick={handleClose}>Tutup</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Simpan
              </Button>
            </div>
          </div>
        </DialogActions>
      </FormContainer>
    </ModalTransition>
  );
};

export default PermissionComebackForm;
