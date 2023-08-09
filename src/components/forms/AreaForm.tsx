import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import type { Area, Branch } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  SwitchElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import ModalTransition from "../dialogs/ModalTransition";
import ConfirmationDialog from "./ConfirmationDialog";
// import { useInView } from "react-intersection-observer";

export type AutocompleteOptions = {
  id: string;
  label: string;
};

export type AreaFormType = Omit<
  Area,
  "id" | "createdBy" | "createdAt" | "updatedBy" | "updatedAt"
> & {
  branch: Branch | AutocompleteOptions | null;
};

const defaultValues: AreaFormType = {
  branch: null,
  branchId: "",
  name: "",
  isActive: true,
};

const AreaForm = () => {
  const {
    form: {
      area: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<AreaFormType>({ defaultValues });

  const [options, setOptions] = useState<AutocompleteOptions[]>([]);
  // const { ref: refInView, inView } = useInView();

  const [search, setSearch] = useState<{ area: string }>({ area: "" });

  const {
    setValue,
    formState: { isSubmitting },
    reset,
    setError,
  } = formContext;

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const { data: dataView } = api.area.getUnique.useQuery(
    { id: id as string },
    { enabled: !!id }
  );
  const { data, isLoading } = api.branch.getAll.useQuery({
    q: search.area,
    show: "active",
    limit: 50,
  });

  const handleClose = () => void setFormClose("area");

  const handleOpenConfirm = () => void setOpenConfirmation(true);

  const handleCloseConfirm = () => void setOpenConfirmation(false);

  const mutationCreate = api.area.create.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof AreaFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const mutationUpdate = api.area.update.useMutation({
    onSuccess: () => void handleClose(),
  });

  const mutationDelete = api.area.delete.useMutation({
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

  const onSubmit = (data: AreaFormType) => {
    // console.log({ data });
    const dataSave = { ...data, branchId: data.branch?.id ?? "" };
    if (dataView && id) {
      return void mutationUpdate.mutate({ ...dataSave, id });
    }
    return void mutationCreate.mutate(dataSave);
  };

  useEffect(() => {
    if (data) {
      const dataOpt =
        data?.rows
          .map((branch: Branch) => ({
            id: branch.id,
            label: `${branch.name} (${branch.gender})`,
          }))
          .flat() ?? [];
      setOptions(dataOpt);
    }
  }, [data]);

  useEffect(() => {
    if (open) {
      reset();
      if (dataView) {
        for (const key in dataView) {
          if (Object.prototype.hasOwnProperty.call(dataView, key)) {
            if (key === "branch") {
              setValue("branch", {
                ...dataView.branch,
                id: dataView.branch.id,
                label: `${dataView.branch.name} (${dataView.branch.gender})`,
              });
              continue;
            }
            setValue(
              key as keyof AreaFormType,
              dataView[key as keyof AreaFormType]
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
        <DialogTitle>{"Gedung"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-2">
            <AutocompleteElement
              name="branch"
              label="Asrama"
              required
              options={options}
              loading={isLoading}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, area: event.target.value })),
              }}
            />
            <TextFieldElement name="name" label="Name" required fullWidth />
            <SwitchElement label="Aktif" name="isActive" />
          </div>
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
        title="Gedung Delete Confirmation"
        message="Are you sure for this action?"
        open={openConfirmation}
        onClose={handleCloseConfirm}
        onSubmit={handleDelete}
      />
    </ModalTransition>
  );
};

export default AreaForm;
