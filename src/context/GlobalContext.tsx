import { darkTheme, lightTheme } from "@/styles/theme";
import { CssBaseline, ThemeProvider as MuiProvider } from "@mui/material";
import { useTheme } from "next-themes";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type globalContextType = {
  theme: "system" | "light" | "dark" | string | undefined;
};

const globalContextDefaultValues: globalContextType = {
  theme: "system",
};

const GlobalContext = createContext<globalContextType>(
  globalContextDefaultValues
);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

type Props = {
  children: ReactNode;
};

export function GlobalContextProvider({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<
    "system" | "light" | "dark" | string | undefined
  >("system");
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const curTheme = theme === "system" ? systemTheme : theme;
    // console.log({ curTheme });
    setCurrentTheme(curTheme);
  }, [theme, systemTheme]);

  const value = { theme: currentTheme };

  return (
    <>
      <GlobalContext.Provider value={value}>
        <MuiProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
          <CssBaseline enableColorScheme={true} />
          {children}
        </MuiProvider>
      </GlobalContext.Provider>
    </>
  );
}
