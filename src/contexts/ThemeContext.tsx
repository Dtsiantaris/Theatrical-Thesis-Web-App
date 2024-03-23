import React, { createContext, useState, useEffect } from "react";
import DarkTheme, {
  CustomBackground,
  CustomColor,
} from "../assets/themes/DarkTheme"; // Replace 'CustomColor' with the actual type of your custom color.
import dynamic from "next/dynamic";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeObjectType } from "../utils/colorTools";

const ThemeProvider = dynamic(
  () => import("@mui/material").then((mod) => mod.ThemeProvider),
  { ssr: false }
);

export interface ThemeContextData {
  secondaryColor: CustomColor | undefined; // Use 'CustomColor' type here instead of 'string'
  mainColor: CustomColor | undefined;
  backgroundObj: CustomBackground | undefined;
  setSecondaryColor: (color: CustomColor | undefined) => void; // Use 'CustomColor' type here instead of 'string'
  setMainColor: (color: CustomColor | undefined) => void;
  setBackgroundObj: (obj: CustomBackground | undefined) => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  secondaryColor: undefined,
  mainColor: undefined,
  backgroundObj: undefined,
  setSecondaryColor: () => {},
  setMainColor: () => {},
  setBackgroundObj: () => {},
});

export function ThemeContextProvider(props: { children: React.ReactNode }) {
  const [secondaryColor, setSecondaryColor] = useState<CustomColor | undefined>(
    undefined
  );
  const [mainColor, setMainColor] = useState<CustomColor | undefined>(
    undefined
  );

  const [backgroundObj, setBackgroundObj] = useState<
    { default: string; paper: string } | undefined
  >(undefined);

  useEffect(() => {
    if (localStorage.getItem("theme") !== null) {
      const theme = JSON.parse(
        localStorage.getItem("theme") || "null"
      ) as ThemeObjectType;

      setMainColor({ main: theme.primaryColor });
      document.documentElement.style.setProperty(
        "--primary-color",
        theme.primaryColor
      );
      setSecondaryColor({ main: theme.secondaryColor });
      document.documentElement.style.setProperty(
        "--secondary-color",
        theme.secondaryColor
      );
      setBackgroundObj({ default: theme["paper-bg"], paper: theme.paper });
      document.documentElement.style.setProperty("--paper-color", theme.paper);
      document.documentElement.style.setProperty(
        "--paper-bg-color",
        theme["paper-bg"]
      );
    }
  }, []);

  const context: ThemeContextData = {
    secondaryColor,
    mainColor,
    backgroundObj,
    setSecondaryColor,
    setMainColor,
    setBackgroundObj,
  };

  return (
    <ThemeProvider theme={DarkTheme(mainColor, secondaryColor, backgroundObj)}>
      <ThemeContext.Provider value={context}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
