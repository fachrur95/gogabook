import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import type { Area, Branch, Dorm } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  SwitchElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import NumericFormatCustom from "../controls/NumericFormatCustom";
import ModalTransition from "../dialogs/ModalTransition";
import { type AutocompleteOptions } from "./AreaForm";
import ConfirmationDialog from "./ConfirmationDialog";

export type DormFormType = Omit<
  Dorm,
  "id" | "createdBy" | "createdAt" | "updatedBy" | "updatedAt"
> & {
  area: Area | AutocompleteOptions | null;
  branch: Branch | AutocompleteOptions | null;
};

const defaultValues: DormFormType = {
  branch: null,
  area: null,
  areaId: "",
  name: "",
  cupBoard: 1,
  isActive: true,
};

const DormForm = () => {
  const {
    form: {
      dorm: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<DormFormType>({ defaultValues });

  const [options, setOptions] = useState<{
    branch: AutocompleteOptions[];
    area: AutocompleteOptions[];
  }>({ branch: [], area: [] });
  // const { ref: refInView, inView } = useInView();

  const [search, setSearch] = useState<{ branch: string; area: string }>({
    branch: "",
    area: "",
  });

  const {
    setValue,
    formState: { isSubmitting },
    reset,
    setError,
    watch,
  } = formContext;

  const selectedBranch = watch("branch");

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const { data: dataView } = api.dorm.getUnique.useQuery(
    { id: id as string },
    { enabled: !!id }
  );
  const { data: dataBranch, isLoading: isLoadingBranch } =
    api.branch.getAll.useQuery({
      q: search.branch,
      show: "active",
      limit: 50,
    });
  const { data: dataArea, isLoading: isLoadingArea } = api.area.getAll.useQuery(
    {
      q: search.area,
      show: "active",
      limit: 50,
      filter: selectedBranch?.id ?? "",
    }
  );

  const handleClose = () => void setFormClose("dorm");

  const handleOpenConfirm = () => void setOpenConfirmation(true);

  const handleCloseConfirm = () => void setOpenConfirmation(false);

  const mutationCreate = api.dorm.create.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof DormFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const mutationUpdate = api.dorm.update.useMutation({
    onSuccess: () => void handleClose(),
  });

  const mutationDelete = api.dorm.delete.useMutation({
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

  const onSubmit = (data: DormFormType) => {
    // console.log({ data });
    const dataSave = { ...data, areaId: data.area?.id ?? "" };
    if (dataView && id) {
      return void mutationUpdate.mutate({ ...dataSave, id });
    }
    return void mutationCreate.mutate(dataSave);
  };

  useEffect(() => {
    if (dataBranch) {
      const dataOpt =
        dataBranch?.rows
          .map((branch: Branch) => ({
            id: branch.id,
            label: `${branch.name} (${branch.gender})`,
          }))
          .flat() ?? [];
      setOptions((old) => ({ ...old, branch: dataOpt }));
    }
  }, [dataBranch]);

  useEffect(() => {
    if (dataArea) {
      const dataOpt =
        dataArea?.rows
          .map((area: Area) => ({
            id: area.id,
            label: area.name,
          }))
          .flat() ?? [];
      setOptions((old) => ({ ...old, area: dataOpt }));
    }
  }, [dataArea]);

  useEffect(() => {
    if (open) {
      reset();
      if (dataView) {
        for (const key in dataView) {
          if (Object.prototype.hasOwnProperty.call(dataView, key)) {
            if (key === "area") {
              setValue("area", {
                ...dataView.area,
                id: dataView.area.id,
                label: dataView.area.name,
              });
              setValue("branch", {
                ...dataView.area.branch,
                id: dataView.area.branch.id,
                label: dataView.area.branch.name,
              });
              continue;
            }
            setValue(
              key as keyof Omit<DormFormType, "branch">,
              dataView[key as keyof Omit<DormFormType, "branch">]
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
        <DialogTitle>{"Kamar"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-2">
            <AutocompleteElement
              name="branch"
              label="Asrama"
              required
              options={options.branch}
              loading={isLoadingBranch}
              autocompleteProps={{
                onChange: () => setValue("area", null),
              }}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, branch: event.target.value })),
              }}
            />
            <AutocompleteElement
              name="area"
              label="Gedung"
              required
              options={options.area}
              loading={isLoadingArea}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, area: event.target.value })),
              }}
            />
            <TextFieldElement name="name" label="Name" required fullWidth />
            <TextFieldElement
              name="cupBoard"
              label="Jumlah Lemari"
              required
              fullWidth
              InputProps={{
                inputComponent: NumericFormatCustom as never,
              }}
            />
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
        title="Dorm Delete Confirmation"
        message="Are you sure for this action?"
        open={openConfirmation}
        onClose={handleCloseConfirm}
        onSubmit={handleDelete}
      />
    </ModalTransition>
  );
};

export default DormForm;
