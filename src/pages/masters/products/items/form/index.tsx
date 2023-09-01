import type { MyPage } from "@/components/layouts/layoutTypes";
import type { IMasterItem } from "@/types/masters/masterItem";
import React from "react";
import {
  // AutocompleteElement,
  FormContainer,
  // RadioButtonGroup,
  // SelectElement,
  // SwitchElement,
  // TextFieldElement,
  // TextareaAutosizeElement,
  // useFieldArray,
  useForm,
} from "react-hook-form-mui";
import type { IDataOption } from "@/types/options";
import { Box, Button, Paper } from "@mui/material";
import Head from "next/head";
import AutocompleteMasterItemCategory from "@/components/controls/autocompletes/masters/AutocompleteMasterItemCategory";
import AutocompleteMasterOther from "@/components/controls/autocompletes/masters/AutocompleteMasterOther";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import type { ISessionData } from "@/types/session";

type MasterItemBodyType = Partial<IMasterItem> & {
  itemcategory: IDataOption | null;
  brand: IDataOption | null;
  tax: IDataOption | null;
  unit: IDataOption | null;
};

const defaultValues: MasterItemBodyType = {
  itemcategory: null,
  brand: null,
  tax: null,
  unit: null,
};

const MasterItemFormPage: MyPage = () => {
  const formContext = useForm<MasterItemBodyType>({ defaultValues });

  const {
    // control,
    // setValue,
    // getValues,
    formState: { isSubmitting },
    // reset,
    // setError,
    // watch,
  } = formContext;

  const onSubmit = (data: MasterItemBodyType) => {
    console.log({ data });
  };

  return (
    <>
      <Head>
        <title>{`Gogabook | Form Master Item`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="p-2">
        <FormContainer formContext={formContext} onSuccess={onSubmit}>
          <Box
            component={Paper}
            className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3"
          >
            <AutocompleteMasterItemCategory
              name="itemcategory"
              label="Item Category"
              required
            />
            <AutocompleteMasterOther
              name="tax"
              label="Tax"
              required
              type="tax"
            />
            <AutocompleteMasterOther
              name="unit"
              label="Unit of measurement"
              required
              type="uom"
            />
            <AutocompleteMasterOther name="brand" label="Brand" type="brand" />
          </Box>
          <Box className="flex flex-col justify-between md:flex-row">
            <div></div>
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                Save
              </Button>
            </div>
          </Box>
        </FormContainer>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const accessToken = session.accessToken;
  const sessionData = jwtDecode<ISessionData>(accessToken);

  if (sessionData.business === null) {
    return {
      redirect: {
        destination: "/credentials/business",
        permanent: false,
      },
    };
  }

  if (sessionData.privilege === null) {
    return {
      redirect: {
        destination: "/credentials/privilege",
        permanent: false,
      },
    };
  }

  if (sessionData.store === null) {
    return {
      redirect: {
        destination: "/credentials/store",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      sessionData,
    },
  };
};

export default MasterItemFormPage;
MasterItemFormPage.Layout = "Dashboard";
