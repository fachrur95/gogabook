import CopyrightInfo from "@/components/displays/CopyrightInfo";
import type { MyPage } from "@/components/layouts/layoutTypes";
import { getServerAuthSession } from "@/server/auth";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Paper, Typography } from "@mui/material";
import { type GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";

type SignInFormType = {
  email: string;
  password: string;
};

const defaultValues: SignInFormType = {
  email: "",
  password: "",
};

const AuthLoginPage: MyPage = () => {
  const formContext = useForm<SignInFormType>({ defaultValues });

  const {
    formState: { isSubmitting },
  } = formContext;

  const onSubmit = async (data: SignInFormType) => {
    console.log({ data });
    await signIn("next-auth", { ...data, callbackUrl: "/" });
    // if (dataView && id) {
    //   return void mutationUpdate.mutate({ ...data, id });
    // }
    // return void mutationCreate.mutate(data);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{`Gogabook | Sign In`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container component="main" maxWidth={false}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "80vh",
            justifyContent: "center",
          }}
        >
          <Box
            component={Paper}
            elevation={4}
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-[98%] p-8 md:w-[65%] lg:w-[50%] xl:w-[35%]"
          >
            <Image
              alt="Logo"
              src="/img/logo-text.png"
              layout="intrinsic"
              objectFit="cover"
              quality={100}
              width={200}
              height={100}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                className="text-lg font-semibold md:text-3xl 2xl:text-6xl"
                gutterBottom
              >
                Sign in
              </Typography>
              <Typography
                variant="subtitle2"
                className="font-light"
                color="gray"
              >
                Login with Gogabook account
              </Typography>
              <Box className="w-full">
                <FormContainer formContext={formContext} onSuccess={onSubmit}>
                  <Box className="grid grid-cols-1 gap-4">
                    <TextFieldElement
                      name="email"
                      label="Email or Username"
                      required
                      autoFocus
                      fullWidth
                    />
                    <PasswordElement
                      name="password"
                      label="Password"
                      type="password"
                      required
                      fullWidth
                    />
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      loading={isSubmitting}
                      size="large"
                    >
                      Sign In
                    </LoadingButton>
                  </Box>
                </FormContainer>
              </Box>
            </Box>
          </Box>
        </Box>
        <CopyrightInfo />
      </Container>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthLoginPage;
AuthLoginPage.Layout = "Image";
