import React, { createContext, useState, useEffect } from "react";
import DarkTheme, { CustomColor } from "../assets/themes/DarkTheme"; // Replace 'CustomColor' with the actual type of your custom color.
import dynamic from "next/dynamic";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

const ThemeProvider = dynamic(
  () => import("@mui/material").then((mod) => mod.ThemeProvider),
  { ssr: false }
);

export interface ThemeContextData {
  secondaryColor: CustomColor | undefined; // Use 'CustomColor' type here instead of 'string'
  mainColor: CustomColor | undefined;
  setSecondaryColor: (color: CustomColor | undefined) => void; // Use 'CustomColor' type here instead of 'string'
  setMainColor: (color: CustomColor | undefined) => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  secondaryColor: undefined,
  mainColor: undefined,
  setSecondaryColor: () => {},
  setMainColor: () => {},
});

export function ThemeContextProvider(props: { children: React.ReactNode }) {
  const [secondaryColor, setSecondaryColor] = useState<CustomColor | undefined>(
    undefined
  );
  const [mainColor, setMainColor] = useState<CustomColor | undefined>(
    undefined
  );

  useEffect(() => {
    if (localStorage.getItem("secondaryColor") !== null) {
      const color = JSON.parse(
        localStorage.getItem("secondaryColor") || "null"
      ) as CustomColor; // Parse the value as 'CustomColor'
      setSecondaryColor(color);
    }
    if (localStorage.getItem("mainColor") !== null) {
      const color = JSON.parse(
        localStorage.getItem("mainColor") || "null"
      ) as CustomColor; // Parse the value as 'CustomColor'
      setMainColor(color);
    }
  }, []);

  const context: ThemeContextData = {
    secondaryColor,
    mainColor,
    setSecondaryColor,
    setMainColor,
  };

  return (
    <ThemeProvider theme={DarkTheme(mainColor)}>
      <ThemeContext.Provider value={context}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
