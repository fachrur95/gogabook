import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { type Branch } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  FormContainer,
  RadioButtonGroup,
  SwitchElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import ModalTransition from "../dialogs/ModalTransition";
import ConfirmationDialog from "./ConfirmationDialog";

export type BranchFormType = Omit<
  Branch,
  "id" | "createdBy" | "createdAt" | "updatedBy" | "updatedAt"
>;

const defaultValues: BranchFormType = {
  name: "",
  gender: "BANIN",
  isActive: true,
};

const BranchForm = () => {
  const {
    form: {
      branch: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<BranchFormType>({ defaultValues });

  const {
    setValue,
    formState: { isSubmitting },
    reset,
    setError,
  } = formContext;

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const { data: dataView } = api.branch.getUnique.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const handleClose = () => void setFormClose("branch");

  const handleOpenConfirm = () => void setOpenConfirmation(true);

  const handleCloseConfirm = () => void setOpenConfirmation(false);

  const mutationCreate = api.branch.create.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof BranchFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const mutationUpdate = api.branch.update.useMutation({
    onSuccess: () => void handleClose(),
  });

  const mutationDelete = api.branch.delete.useMutation({
    onSuccess: () => {
      void handleClose();
      void handleCloseConfirm();
    },
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }
    mutationDelete.mutate({ ids: id });
  };

  const onSubmit = (data: BranchFormType) => {
    if (dataView && id) {
      return void mutationUpdate.mutate({ ...data, id });
    }
    return void mutationCreate.mutate(data);
  };

  useEffect(() => {
    if (open) {
      reset();
      if (dataView) {
        for (const key in dataView) {
          if (Object.prototype.hasOwnProperty.call(dataView, key)) {
            setValue(
              key as keyof BranchFormType,
              dataView[key as keyof BranchFormType]
            );
          }
        }
      }
    }
  }, [dataView, setValue, reset, open]);

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="xs"
      handleClose={handleClose}
    >
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <DialogTitle>{"Asrama"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-2">
            <TextFieldElement
              name="name"
              label="Name"
              required
              autoFocus
              fullWidth
            />
            <RadioButtonGroup
              label="Sektor"
              name="gender"
              options={[
                {
                  id: "BANIN",
                  label: "BANIN",
                },
                {
                  id: "BANAT",
                  label: "BANAT",
                },
              ]}
              row
            />
            <SwitchElement label="Aktif" name="isActive" />
          </div>
          {/* <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            {id ? (
              <IconButton onClick={handleOpenConfirm} color="error">
                <Delete />
              </IconButton>
            ) : (
              <div></div>
            )}
            <div className="flex flex-row gap-2">
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </div>
        </DialogActions>
      </FormContainer>
      <ConfirmationDialog
        title="Asrama Delete Confirmation"
        message="Are you sure for this action?"
        open={openConfirmation}
        onClose={handleCloseConfirm}
        onSubmit={handleDelete}
      />
    </ModalTransition>
  );
};

export default BranchForm;
