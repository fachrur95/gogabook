import useGeneralSetting from "@/components/hooks/useGeneralSetting";
import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const CoreHeader = (props: Props) => {
  const { data: dataGeneralSetting } = useGeneralSetting();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    "system"
  );
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const curTheme = theme === "system" ? systemTheme : theme;
    // console.log({ curTheme });
    setCurrentTheme(curTheme);
  }, [theme, systemTheme]);
  return (
    <HideOnScroll {...props}>
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor:
            currentTheme === "dark"
              ? undefined
              : dataGeneralSetting?.generalsetting_warna ?? undefined,
        }}
      >
        {props.children}
      </AppBar>
    </HideOnScroll>
  );
};

export default CoreHeader;
