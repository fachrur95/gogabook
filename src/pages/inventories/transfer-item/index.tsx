import { getServerAuthSession } from "@/server/auth";
import type { ISessionData } from "@/types/session";
import axiosSSR from "@/utils/axios/axiosSSR";
import jwtDecode from "jwt-decode";
import { type GetServerSideProps } from "next";
import React from "react";

const page = "transfer-item";
const basePath = "/inventories/transfer-item";
const defaultPath = "/transfer-item-direct";

const RedirectionPage = () => {
  return <div>RedirectionPage</div>;
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

  if (sessionData.isSuperAdmin === false) {
    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
    };
    const res = await axiosSSR<{ allow: boolean; destination: string }>({
      url: `core/roles/check/${page}?deep=true`,
      method: "GET",
      headers,
    });
    if (res.status === 200) {
      const { data } = res;
      const { allow, destination } = data;

      if (allow === false) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }
      return {
        redirect: {
          permanent: false,
          destination: `${basePath}/${destination}`,
        },
        props: {
          session,
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: `${basePath}${defaultPath}`,
    },
    props: {
      session,
      sessionData,
    },
  };
};

export default RedirectionPage;
