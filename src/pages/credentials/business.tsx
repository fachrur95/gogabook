import type { MyPage } from "@/components/layouts/layoutTypes";
import React, { useEffect, useState } from "react";
import { api } from "@/utils/api";
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
import { signOut, useSession } from "next-auth/react";
import Add from "@mui/icons-material/Add";
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
import type { InfiniteQueryResult } from "@/types/api-response";
import useSessionData from "@/components/displays/useSessionData";

const CredentialBusinessPage: MyPage = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const { data: sessionData } = useSessionData();
  const { ref, inView } = useInView();
  const [rows, setRows] = useState<IUserBusiness[]>([]);
  const [countAll, setCountAll] = useState<number>(0);
  const { search, setSearch } = useAppStore();
  const { setOpenNotification } = useNotification();

  const {
    // isError,
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    // refetch,
    // isLoading,
  } = api.credentialBusiness.getAll.useInfiniteQuery(
    { limit: 10, q: search },
    {
      getNextPageParam: (lastPage: InfiniteQueryResult<IUserBusiness>) =>
        typeof lastPage.currentPage === "number" && rows.length < countAll
          ? (lastPage.currentPage ?? 0) + 1
          : undefined,
      staleTime: 0,
    }
  );

  const mutationSet = api.credentialBusiness.setBusiness.useMutation();

  const handleSetBusiness = async (id: string) => {
    console.log({ id });
    await mutationSet.mutateAsync(
      { id },
      {
        onError: (err) => console.log(err),
        onSuccess: async (data) => {
          console.log(data);
          if (!data) {
            return void setOpenNotification("Error to set business");
          }
          await handleUpdateSession({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
          void router.push("/credentials/privilege");
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
        .map((page) => page.result.map((business: IUserBusiness) => business))
        .flat();
      const dataCountAll: number = data.pages[0]?.countAll ?? 0;
      setRows(dataRows);
      setCountAll(dataCountAll);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Head>
        <title>{`Gogabook | Business`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container maxWidth="md" component={Paper} sx={{ py: 3, my: 2 }}>
        <Box>
          <Button
            variant="text"
            color="success"
            startIcon={<ArrowBack />}
            onClick={() => void signOut()}
          >
            Back To Login
          </Button>
        </Box>
        <Box className="flex flex-row items-center justify-between py-2">
          <div>
            <Typography variant="h4">Business</Typography>
            <Typography variant="body1">
              {search === "" ? countAll : rows.length} Business
            </Typography>
          </div>
          <div>
            <Typography variant="h5">Sign as</Typography>
            <Typography variant="body1">{sessionData?.email ?? "-"}</Typography>
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
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            // onClick={() => setOpenAddNew(true)}
            // onClick={() => void handleUpdateSession()}
          >
            Add New
          </Button>
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
                <TableCell>Business</TableCell>
                <TableCell>Owner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((business, index) => (
                <TableRow
                  hover
                  key={index}
                  // onClick={() => handleChooseBusiness(business)}
                  onClick={() =>
                    void handleSetBusiness(business.masterbussiness?.id ?? "")
                  }
                >
                  <TableCell component="th" scope="row">
                    {business.masterbussiness?.generalsetting
                      ?.generalsetting_namaperusahaan ?? ""}
                  </TableCell>
                  <TableCell>
                    {business.masterbussiness?.masterbussiness_oleh ?? ""}
                    {index === rows.length - 1 && (
                      <div className="invisible" ref={ref}></div>
                    )}
                  </TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell> */}
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

  return {
    props: {
      session,
    },
  };
};

export default CredentialBusinessPage;
CredentialBusinessPage.Layout = "Image";
