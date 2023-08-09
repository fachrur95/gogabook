import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Student } from "@prisma/client";
import { useEffect } from "react";
import { FormContainer, useForm } from "react-hook-form-mui";
import DateTimePickerWithHijri from "../controls/DateTimePickerWithHijri";
import ModalTransition from "../dialogs/ModalTransition";

type RetireStudentFormType = Pick<Student, "retireDate">;

const defaultValues: RetireStudentFormType = {
  retireDate: new Date(),
};

const RetireStudentForm = () => {
  const {
    form: {
      retireStudent: { open, id },
    },
    setFormClose,
  } = useAppStore();
  const formContext = useForm<RetireStudentFormType>({ defaultValues });

  const {
    formState: { isSubmitting },
    reset,
    setError,
    watch,
  } = formContext;

  const selectedDate = watch("retireDate");

  const handleClose = () => void setFormClose("retireStudent");

  const { data: dataView } = api.student.getUnique.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const mutation = api.student.retire.useMutation({
    onSuccess: () => void handleClose(),
    onError: (error) => {
      const errors = error.data?.zodError?.fieldErrors;
      if (errors) {
        for (const field in errors) {
          setError(field as keyof RetireStudentFormType, {
            type: "custom",
            message: errors[field]?.join(", "),
          });
        }
      }
    },
  });

  const onSubmit = (data: RetireStudentFormType) =>
    void mutation.mutate({
      ...data,
      retireDate: data.retireDate ?? new Date(),
      id: id ?? "-",
    });

  useEffect(() => {
    if (open) void reset();
  }, [open, reset]);

  return (
    <ModalTransition
      open={open}
      fullWidth={true}
      maxWidth="xs"
      handleClose={handleClose}
    >
      <FormContainer formContext={formContext} onSuccess={onSubmit}>
        <DialogTitle>{"Berhenti/ Boyong"}</DialogTitle>
        <DialogContent dividers>
          <div className="flex flex-col gap-4">
            <Typography variant="body1" gutterBottom>
              Santri: {dataView?.fullName ?? "-"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Asrama:{" "}
              {`${dataView?.dorm.area.branch.name ?? "-"} ${
                dataView?.dorm.area.name ?? "-"
              } ${dataView?.dorm.name ?? "-"}`}
            </Typography>
            <DateTimePickerWithHijri
              selectedDate={selectedDate}
              name="retireDate"
              label="Tanggal Berhenti/ Boyong"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex w-full flex-row justify-between">
            <div></div>
            <div className="flex flex-row gap-2">
              <Button onClick={handleClose}>Close</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Boyong
              </Button>
            </div>
          </div>
        </DialogActions>
      </FormContainer>
    </ModalTransition>
  );
};

export default RetireStudentForm;
