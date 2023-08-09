import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import Delete from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import type { PermissionDetail, Student } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import DateTimePickerWithHijri from "../controls/DateTimePickerWithHijri";
import ModalTransition from "../dialogs/ModalTransition";
import ConfirmationDialog from "./ConfirmationDialog";
import PermissionComebackForm from "./PermissionComebackForm";

export type AutocompleteOptions = {
  id: string;
  label: string;
  imageUrl?: string | null;
};

export type PermissionDetailFormType = Omit<
  PermissionDetail,
  | "id"
  | "createdBy"
  | "createdAt"
  | "updatedBy"
  | "updatedAt"
  | "sequence"
  | "inDate"
> & {
  student: Student | AutocompleteOptions | null;
};

const defaultValues: PermissionDetailFormType = {
  student: null,
  permissionId: "",
  studentId: "",
  outDate: new Date(),
  note: "",
};

const PermissionDetailForm = ({ permissionId }: { permissionId: string }) => {
  const {
    form: {
      permissionDetail: { open, id },
    },
    setFormClose,
    setFormOpen,
  } = useAppStore();
  const formContext = useForm<PermissionDetailFormType>({ defaultValues });

  const [options, setOptions] = useState<{
    student: AutocompleteOptions[];
  }>({ student: [] });

  const [search, setSearch] = useState<{ student: string }>({
    student: "",
  });

  const {
    setValue,
    formState: { isSubmitting },
    reset,
    setError,
    watch,
  } = formContext;

  const selectedDate = watch("outDate");

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const { data: dataParent } = api.permission.getUnique.useQuery(
    { id: permissionId },
    { enabled: !!permissionId }
  );
  const { data: dataView } = api.permission.getUniqueDetail.useQuery(
    { id: id as string },
    { enabled: !!id }
  );
  const { data: dataStudent, isLoading: isLoadingStudent } =
    api.student.getAll.useQuery(
      {
        q: search.student,
        show: "active",
        limit: 50,
        exist: permissionId,
        area: dataParent?.areaId,
      },
      { enabled: !!dataParent?.areaId }
    );

  const handleClose = () => void setFormClose("permissionDetail");

  const handleOpenConfirm = () => void setOpenConfirmation(true);

  const handleCloseConfirm = () => void setOpenConfirmation(false);

  const mutationCreate = api.permission.createDetail.useMutation({
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

  const mutationUpdate = api.permission.updateDetail.useMutation({
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

  const mutationDelete = api.permission.deleteDetail.useMutation({
    onSuccess: () => {
      void handleClose();
      void handleCloseConfirm();
    },
  });

  const handleDelete = () => {
    if (!id) {
      return;
    }
    mutationDelete.mutate({ ids: id, permissionId });
  };

  const onSubmit = (data: PermissionDetailFormType) => {
    // console.log({ data });
    const dataSave = {
      ...data,
      permissionId,
      studentId: data.student?.id ?? "",
    };
    if (dataView && id) {
      return void mutationUpdate.mutate({ ...dataSave, id });
    }
    return void mutationCreate.mutate(dataSave);
  };

  useEffect(() => {
    if (open) {
      reset();
      if (dataView) {
        for (const key in dataView) {
          if (Object.prototype.hasOwnProperty.call(dataView, key)) {
            if (key === "student") {
              setValue("student", {
                ...dataView.student,
                id: dataView.student.id,
                label: `${dataView.student.fullName}${
                  dataView.student.nickName
                    ? ` (${dataView.student.nickName})`
                    : ""
                }`,
                imageUrl: dataView.student.imageProfileUrl,
              });
              continue;
            }
            setValue(
              key as keyof Omit<PermissionDetailFormType, "student">,
              dataView[key as keyof Omit<PermissionDetailFormType, "student">]
            );
          }
        }
      }
    }
  }, [dataView, setValue, reset, open]);

  useEffect(() => {
    if (dataStudent) {
      const dataOpt =
        dataStudent?.rows
          .map((student: Student) => ({
            id: student.id,
            // label: `${student.fullName} (${student.address})`,
            label: `${student.fullName}${
              student.nickName ? ` (${student.nickName})` : ""
            }`,
            imageUrl: student.imageProfileUrl,
          }))
          .flat() ?? [];
      setOptions((old) => ({ ...old, student: dataOpt }));
    }
  }, [dataStudent]);

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="xs"
      handleClose={handleClose}
    >
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <DialogTitle>{"Perizinan"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-4">
            <DateTimePickerWithHijri
              selectedDate={selectedDate}
              name="outDate"
              label="Tanggal Izin"
            />
            <AutocompleteElement
              name="student"
              label="Santri Yang Akan Izin"
              required
              options={options.student}
              loading={isLoadingStudent}
              autocompleteProps={{
                renderOption: (props, option: AutocompleteOptions) => (
                  <Box
                    component="li"
                    // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <Avatar
                      // loading="lazy"
                      src={option.imageUrl ?? undefined}
                      alt={option.label}
                      sx={{ mr: 2, flexShrink: 0 }}
                    />
                    <Typography variant="body1" color="initial">
                      {option.label}
                    </Typography>
                  </Box>
                ),
              }}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, student: event.target.value })),
              }}
            />
            <TextFieldElement name="note" label="Catatan" autoFocus fullWidth />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            {id ? (
              <div>
                <IconButton onClick={handleOpenConfirm} color="error">
                  <Delete />
                </IconButton>
                {dataView?.inDate === null && (
                  <Button
                    onClick={() =>
                      void setFormOpen({
                        form: "permissionComeback",
                        id: id ?? "-",
                      })
                    }
                    color="error"
                  >
                    Kembali
                  </Button>
                )}
              </div>
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
        title="Perizinan Delete Confirmation"
        message="Are you sure for this action?"
        open={openConfirmation}
        onClose={handleCloseConfirm}
        onSubmit={handleDelete}
      />
      <PermissionComebackForm />
    </ModalTransition>
  );
};

export default PermissionDetailForm;
