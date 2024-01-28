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
  setSecondaryColor: (color: CustomColor | undefined) => void; // Use 'CustomColor' type here instead of 'string'
}

export const ThemeContext = createContext<ThemeContextData>({
  secondaryColor: undefined,
  setSecondaryColor: () => {},
});

export function ThemeContextProvider(props: { children: React.ReactNode }) {
  const [secondaryColor, setSecondaryColor] = useState<CustomColor | undefined>(
    undefined
  );

  useEffect(() => {
    if (localStorage.getItem("secondaryColor") !== null) {
      const color = JSON.parse(
        localStorage.getItem("secondaryColor") || "null"
      ) as CustomColor; // Parse the value as 'CustomColor'
      setSecondaryColor(color);
    }
  }, []);

  useEffect(() => {
    if (secondaryColor) {
      localStorage.setItem("secondaryColor", JSON.stringify(secondaryColor));
    }
  }, [secondaryColor]);

  const context: ThemeContextData = { secondaryColor, setSecondaryColor };

  return (
    <ThemeProvider theme={DarkTheme(secondaryColor)}>
      <ThemeContext.Provider value={context}>
        {props.children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
