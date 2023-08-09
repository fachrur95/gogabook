import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Area, Permission } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import DateTimePickerWithHijri from "../controls/DateTimePickerWithHijri";
import ModalTransition from "../dialogs/ModalTransition";
import { type AutocompleteOptions } from "./AreaForm";

export type PermissionFormType = Pick<
  Permission,
  "note" | "openDate" | "areaId"
> & {
  area: Area | AutocompleteOptions | null;
};

const OpenPermissionForm = () => {
  const { data: sessionData } = useSession();

  const defaultValues: PermissionFormType = {
    area: sessionData?.user.areaId
      ? {
          id: sessionData?.user.areaId ?? "-",
          label: sessionData?.user.area ?? "-",
        }
      : null,
    areaId: sessionData?.user.areaId ?? "",
    openDate: new Date(),
    note: "",
  };

  const [options, setOptions] = useState<{
    branch: AutocompleteOptions[];
    area: AutocompleteOptions[];
  }>({ branch: [], area: [] });

  const [search, setSearch] = useState<{ branch: string; area: string }>({
    branch: "",
    area: "",
  });

  const { data: dataArea, isLoading: isLoadingArea } = api.area.getAll.useQuery(
    {
      q: search.area,
      show: "active",
      limit: 50,
    }
  );

  const {
    form: {
      openPermission: { open },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<PermissionFormType>({ defaultValues });

  const {
    formState: { isSubmitting },
    reset,
    setError,
    watch,
  } = formContext;

  const selectedDate = watch("openDate");

  const handleClose = () => void setFormClose("openPermission");

  const mutationCreate = api.permission.createOpen.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof PermissionFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const onSubmit = (data: PermissionFormType) =>
    void mutationCreate.mutate({ ...data, areaId: data.area?.id ?? "" });

  useEffect(() => {
    if (open) void reset();
  }, [open, reset]);

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

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="xs"
      handleClose={handleClose}
    >
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <DialogTitle>{"Buka Perizinan"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-2 flex flex-col gap-4">
            {/* <Typography variant="body1" gutterBottom>
              Gedung: {sessionData?.user.area ?? "-"}
            </Typography> */}
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
              autocompleteProps={{
                disabled: sessionData?.user.role !== "SUPERADMIN",
              }}
            />
            <Typography variant="body1" gutterBottom>
              Dibuka Oleh: {sessionData?.user.name ?? "-"}
            </Typography>
            <DateTimePickerWithHijri
              selectedDate={selectedDate}
              name="openDate"
              label="Tanggal Buka"
            />
            <TextFieldElement name="note" label="Catatan" autoFocus fullWidth />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            <div></div>
            <div className="flex flex-row gap-2">
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Buka
              </Button>
            </div>
          </div>
        </DialogActions>
      </FormContainer>
    </ModalTransition>
  );
};

export default OpenPermissionForm;
