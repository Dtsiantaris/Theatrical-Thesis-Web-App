import { createTheme, responsiveFontSizes, Theme } from "@mui/material";

// Define interface for custom color object used in the theme
export interface CustomColor {
  light: string;
  main: string;
  dark: string;
}

const DarkTheme = (secondaryColor?: CustomColor): Theme => {
  let theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    palette: {
      background: {
        default: "#6b7280", // Slightly lighter than before
        paper: "#9ca3af", // Slightly lighter than before
      },
      primary: {
        light: "#424242", // Slightly lighter than before
        main: "#2B2B2B", // Slightly lighter than before
        dark: "#292929", // Slightly lighter than before
      },
      secondary: {
        light: secondaryColor ? secondaryColor.light : "#BBFFFF", // Slightly lighter than before
        main: secondaryColor ? secondaryColor.main : "#F98D67", // Slightly lighter than before
        dark: secondaryColor ? secondaryColor.dark : "#3EDCDC", // Slightly lighter than before
      },
    },
    typography: {
      h1: {
        fontSize: "2.5em",
      },
      h2: {
        fontSize: "1.9em",
      },
      h3: {
        fontSize: "1.7em",
      },
      h4: {
        fontSize: "1.4em",
      },
      h5: {
        fontSize: "1.1em",
      },
      h6: {
        fontSize: "0.9em",
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

// Define interface for custom color used in DatePickerTheme
interface DatePickerColor {
  main: string;
}

export const DatePickerTheme = (color: DatePickerColor): Theme => {
  if (!color || !color.main) {
    throw new Error("Invalid color object. main property is required");
  }
  return createTheme({
    palette: {
      primary: {
        main: color.main,
      },
    },
  });
};

export default DarkTheme;
