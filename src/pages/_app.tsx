import ConnectionProvider from "@/components/displays/ConnectionProvider";
import { Layouts } from "@/components/layouts";
import { type MyAppProps } from "@/components/layouts/layoutTypes";
import { GlobalContextProvider } from "@/context/GlobalContext";
import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as TwProvider } from "next-themes";
import { SnackbarProvider } from "notistack";
import { useEffect, useRef, useMemo } from "react";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import { api } from "@/utils/api";
import { IEventDeleteWorker } from "@/types/worker";
import { WorkerContext } from "@/components/context/WorkerContext";

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  const Layout =
    Layouts[Component?.Layout ?? "Plain"] ?? ((page: unknown) => page);

  /* const deleteWorker = useMemo(
    () =>
      new Worker(
        new URL("@/utils/workers/deleting.worker.ts", import.meta.url)
      ),
    []
  ); */
  const deleteWorker: Worker = useMemo(
    () =>
      new Worker(
        new URL("@/utils/workers/deleting.worker.ts", import.meta.url)
      ),
    []
  );

  // useEffect(() => {
  //   /* deleteWorker.current = new Worker(
  //     new URL("@/utils/workers/deleting.worker.ts", import.meta.url)
  //   ); */
  //   console.log({ deleteWorker });
  //   deleteWorker.onmessage = (event: MessageEvent<IEventDeleteWorker>) => {
  //     console.log({ path: "app", event });
  //   };
  //   return () => {
  //     deleteWorker.terminate();
  //   };
  // }, []);

  return (
    <TwProvider enableSystem={true} attribute="class" defaultTheme="system">
      <GlobalContextProvider>
        <WorkerContext.Provider
          value={{
            deleteWorker,
          }}
        >
          <SessionProvider session={session as Session}>
            <SnackbarProvider maxSnack={3} dense autoHideDuration={3000}>
              <ConnectionProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ConnectionProvider>
            </SnackbarProvider>
          </SessionProvider>
        </WorkerContext.Provider>
      </GlobalContextProvider>
    </TwProvider>
  );
};

export default api.withTRPC(MyApp);
