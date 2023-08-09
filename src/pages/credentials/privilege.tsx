import type { MyPage } from "@/components/layouts/layoutTypes";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { InfiniteQueryResult } from "@/server/api/routers/credentials/business";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Search from "@mui/icons-material/Search";
import ArrowBack from "@mui/icons-material/ArrowBack";
// import type { IBusiness } from "@/types/cores/business";
import { useInView } from "react-intersection-observer";
import type { IUserBusiness } from "@/types/masters/userBusiness";
import { useAppStore } from "@/utils/store";
import { useRouter } from "next/router";
import useNotification from "@/components/displays/Notification";
import type { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";
import jwtDecode from "jwt-decode";
import type { ISessionData } from "@/types/session";

const CredentialPrivilegePage: MyPage<{
  sessionData: ISessionData;
}> = ({ sessionData }) => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const { ref, inView } = useInView();
  const [rows, setRows] = useState<IUserBusiness[]>([]);
  const [countAll, setCountAll] = useState<number>(0);
  const { search, setSearch } = useAppStore();
  const { setOpenNotification } = useNotification();

  const {
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isLoading,
  } = api.credentialPrivilege.getAll.useInfiniteQuery(
    { limit: 10, q: search },
    {
      getNextPageParam: (lastPage: InfiniteQueryResult<IUserBusiness>) =>
        lastPage.currentPage ? (lastPage.currentPage ?? 0) + 1 : undefined,
      staleTime: 0,
    }
  );

  console.log({ data });

  const mutationSet = api.credentialPrivilege.setPrivilege.useMutation();

  const handleSetPrivilege = async (id: string) => {
    console.log({ id });
    await mutationSet.mutateAsync(
      { id },
      {
        onError: (err) => console.log(err),
        onSuccess: async (data) => {
          console.log(data);
          if (!data) {
            return void setOpenNotification("Error to set privilege");
          }
          await handleUpdateSession({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
          void router.push("/credentials/store");
        },
      }
    );
  };

  // console.log({ data });
  const handleUpdateSession = async (params: {
    accessToken: string;
    refreshToken: string;
  }) => {
    await updateSession({
      ...session,
      ...params,
    });
  };
  // console.log({ session });

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const dataRows: IUserBusiness[] = data?.pages
        .map((page) => page.result.map((privilege: IUserBusiness) => privilege))
        .flat();
      const dataCountAll: number = data.pages[0]?.countAll ?? 0;
      setRows(dataRows);
      setCountAll(dataCountAll);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Head>
        <title>{`Gogabook | Privilege`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="md" component={Paper} sx={{ py: 3, my: 2 }}>
        <Box>
          <Button
            variant="text"
            color="success"
            startIcon={<ArrowBack />}
            onClick={() => void router.push("/credentials/business")}
          >
            Back To Business
          </Button>
        </Box>
        <Box className="flex flex-row items-center justify-between py-2">
          <div>
            <Typography variant="h4">Privilege</Typography>
            <Typography variant="body1">
              {search === "" ? countAll : rows.length} Privilege
            </Typography>
          </div>
          <div>
            <Typography variant="h5">Sign as</Typography>
            <Typography variant="body1">{sessionData.email ?? "-"}</Typography>
            <Typography variant="subtitle2">
              {sessionData.businessDesc ?? "-"}
            </Typography>
          </div>
        </Box>
        <Box className="flex flex-row items-center justify-between py-2">
          <div>
            <TextField
              label="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              fullWidth
              // variant="standard"
              size="small"
              onChange={(e) => setSearch(e.target.value ?? "")}
            />
          </div>
        </Box>
        <TableContainer
          component={Paper}
          variant="outlined"
          elevation={0}
          sx={{ maxHeight: "60vh" }}
        >
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Privilege</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((business, index) => (
                <TableRow
                  hover
                  key={index}
                  // onClick={() => handleChooseBusiness(business)}
                  onClick={() =>
                    void handleSetPrivilege(
                      business.masterusercategory_id ?? ""
                    )
                  }
                >
                  <TableCell component="th" scope="row">
                    {business.userbusiness_usercategory
                      ?.masterother_description ?? ""}
                    {index === rows.length - 1 && (
                      <div className="invisible" ref={ref}></div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
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

  return {
    props: {
      session,
      sessionData,
    },
  };
};

export default CredentialPrivilegePage;
CredentialPrivilegePage.Layout = "Image";
