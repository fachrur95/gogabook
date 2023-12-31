import type { MyPage } from "@/components/layouts/layoutTypes";
import React from "react";
import Head from "next/head";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import type { ISessionData } from "@/types/session";
import MasterItemForm from "@/components/forms/MasterItemForm";
import { useRouter } from "next/router";
import type { FormSlugType } from "@/types/global";
import axios from "axios";
import type { IMasterItem } from "@/types/masters/masterItem";
import { env } from "@/env.mjs";

const MasterItemFormPage: MyPage = () => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <>
      <Head>
        <title>{`Gogabook | Form Master Item`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MasterItemForm slug={slug as FormSlugType} />
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
  const query = ctx.query;
  const slug = query.slug as FormSlugType;
  const [path, id] = slug;

  if (path !== "f" && path !== "v") {
    return {
      redirect: {
        destination: "/masters/products/items",
        permanent: false,
      },
    };
  }

  let check: IMasterItem | undefined | null = null;

  /*
    Check if id truly exist
    If not exist, redirect to form create immediately
  */
  if (id) {
    check = await axios
      .get<IMasterItem>(`${env.BACKEND_URL}/api/core/items/${id}`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }

  if (typeof check === "undefined") {
    return {
      redirect: {
        destination: "/masters/products/items/f",
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
