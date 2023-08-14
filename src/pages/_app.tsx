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
import { useEffect, useRef } from "react";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

import { api } from "@/utils/api";
import { useAppStore } from "@/utils/store";

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  const Layout = Layouts[Component.Layout] ?? ((page: unknown) => page);
  const deleteWorker = useRef<Worker>();
  const importWorker = useRef<Worker>();
  const { setImportWorker, setDeleteWorker } = useAppStore();

  useEffect(() => {
    deleteWorker.current = new Worker(
      new URL("../utils/workers/deleting.worker.ts", import.meta.url)
    );
    importWorker.current = new Worker(
      new URL("../utils/workers/importing.worker.ts", import.meta.url)
    );

    deleteWorker.current.onerror = (event) => {
      if (event instanceof Event) {
        console.log("🍎 Error message received from delete worker: ", event);
        return event;
      }

      console.log("🍎 Unexpected delete error: ", event);
      throw event;
    };

    importWorker.current.onerror = (event) => {
      if (event instanceof Event) {
        console.log("🍎 Error message received from import worker: ", event);
        return event;
      }

      console.log("🍎 Unexpected import error: ", event);
      throw event;
    };

    setImportWorker(deleteWorker);
    setDeleteWorker(importWorker);

    return () => {
      deleteWorker.current?.terminate();
      importWorker.current?.terminate();
    };
  }, [setImportWorker, setDeleteWorker]);

  return (
    <TwProvider enableSystem={true} attribute="class" defaultTheme="system">
      <GlobalContextProvider>
        <SessionProvider session={session as Session}>
          <SnackbarProvider maxSnack={3} dense autoHideDuration={3000}>
            <ConnectionProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ConnectionProvider>
          </SnackbarProvider>
        </SessionProvider>
      </GlobalContextProvider>
    </TwProvider>
  );
};

export default api.withTRPC(MyApp);
