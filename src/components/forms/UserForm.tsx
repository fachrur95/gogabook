import { type StudentWithInclude } from "@/server/api/routers/student";
import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import type { Area, Student, User } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  PasswordElement,
  PasswordRepeatElement,
  RadioButtonGroup,
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

export type UserFormType = Omit<User, "id" | "emailVerified" | "image"> & {
  area: Area | AutocompleteOptions | null;
  student: Student | AutocompleteOptions | null;
  confirmPassword: string;
};

const defaultValues: UserFormType = {
  area: null,
  student: null,
  areaId: "",
  studentId: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: null,
};

const UserForm = () => {
  const {
    form: {
      user: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<UserFormType>({ defaultValues });

  const [options, setOptions] = useState<{
    area: AutocompleteOptions[];
    student: AutocompleteOptions[];
  }>({
    area: [],
    student: [],
  });

  const [search, setSearch] = useState<{ area: string; student: string }>({
    area: "",
    student: "",
  });

  const {
    setValue,
    formState: { isSubmitting },
    reset,
    setError,
  } = formContext;

  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const { data: dataView } = api.user.getUnique.useQuery(
    { id: id as string },
    { enabled: !!id }
  );
  const { data: dataArea, isLoading: isLoadingArea } = api.area.getAll.useQuery(
    {
      q: search.area,
      show: "active",
      limit: 50,
    }
  );
  const { data: dataStudent, isLoading: isLoadingStudent } =
    api.student.getAll.useQuery({
      q: search.area,
      show: "active",
      limit: 50,
    });

  const handleClose = () => void setFormClose("user");

  const handleOpenConfirm = () => void setOpenConfirmation(true);

  const handleCloseConfirm = () => void setOpenConfirmation(false);

  const mutationCreate = api.user.create.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof UserFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const mutationUpdate = api.user.update.useMutation({
    onSuccess: () => void handleClose(),
  });

  const mutationDelete = api.user.delete.useMutation({
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

  const onSubmit = (data: UserFormType) => {
    // console.log({ data });
    const dataSave = {
      ...data,
      areaId: data.area?.id ?? "",
      studentId: data.student?.id ?? null,
    };
    if (dataView && id) {
      return void mutationUpdate.mutate({ ...dataSave, id });
    }
    return void mutationCreate.mutate(dataSave);
  };

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
    if (dataStudent) {
      const dataOpt =
        dataStudent?.rows
          .map((student: StudentWithInclude) => ({
            id: student.id,
            label: `${student.fullName}${
              student.nickName ? ` / ${student.nickName}` : ""
            } (${student.dorm.area.branch.name} ${student.dorm.area.name} ${
              student.dorm.name
            })`,
          }))
          .flat() ?? [];
      setOptions((old) => ({ ...old, student: dataOpt }));
    }
  }, [dataStudent]);

  useEffect(() => {
    if (open) {
      reset();
      if (dataView) {
        for (const key in dataView) {
          if (Object.prototype.hasOwnProperty.call(dataView, key)) {
            if (key === "area") {
              if (dataView.area) {
                setValue("area", {
                  ...dataView.area,
                  id: dataView.area.id,
                  label: dataView.area.name,
                });
              }
              continue;
            }
            if (key === "student") {
              if (dataView.student) {
                setValue("student", {
                  ...dataView.student,
                  id: dataView.studentId ?? "",
                  label: `${dataView.student?.fullName}${
                    dataView.student?.nickName
                      ? ` / ${dataView.student?.nickName}`
                      : ""
                  } (${dataView.student?.dorm.area.branch.name} ${
                    dataView.student?.dorm.area.name
                  } ${dataView.student?.dorm.name})`,
                });
              }
              continue;
            }
            setValue(
              key as keyof Omit<UserFormType, "password" | "confirmPassword">,
              dataView[
                key as keyof Omit<UserFormType, "password" | "confirmPassword">
              ]
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
        <DialogTitle>{"User"}</DialogTitle>
        <DialogContent dividers>
          <div className="mt-4 flex flex-col gap-2">
            <AutocompleteElement
              name="area"
              label="Asrama"
              required
              options={options.area}
              loading={isLoadingArea}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, area: event.target.value })),
              }}
            />
            <AutocompleteElement
              name="student"
              label="Santri (yang mengoperasikan)"
              options={options.student}
              loading={isLoadingStudent}
              textFieldProps={{
                onChange: (event) =>
                  setSearch((old) => ({ ...old, student: event.target.value })),
              }}
            />
            <TextFieldElement
              name="email"
              label="Alamat Surel/ Email"
              type="email"
              required
              fullWidth
            />
            <TextFieldElement name="name" label="Nama" required fullWidth />
            <PasswordElement
              name="password"
              label="Kata Sandi"
              type="password"
              required={id === undefined}
              fullWidth
            />
            <PasswordRepeatElement
              passwordFieldName="password"
              name="confirmPassword"
              label="Konfirmasi Kata Sandi"
              type="confirmPassword"
              required={id === undefined}
              fullWidth
            />
            <RadioButtonGroup
              name="role"
              label="Role"
              required
              options={[
                {
                  id: "SUPERADMIN",
                  label: "SUPER ADMIN",
                },
                {
                  id: "ADMIN",
                  label: "ADMIN",
                },
                {
                  id: "PERIZINAN",
                  label: "PERIZINAN",
                },
                {
                  id: "UBUDIYAH",
                  label: "UBUDIYAH",
                },
                /* {
                  id: "BENDAHARA",
                  label: "BENDAHARA",
                },
                {
                  id: "KEAMANAN",
                  label: "KEAMANAN",
                }, */
                {
                  id: "VISITOR",
                  label: "VISITOR",
                },
              ]}
            />
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
        title="User Delete Confirmation"
        message="Are you sure for this action?"
        open={openConfirmation}
        onClose={handleCloseConfirm}
        onSubmit={handleDelete}
      />
    </ModalTransition>
  );
};

export default UserForm;
