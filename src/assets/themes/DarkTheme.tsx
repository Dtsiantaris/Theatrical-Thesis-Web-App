import { createTheme, responsiveFontSizes, Theme } from "@mui/material";

// Define interface for custom color object used in the theme
export interface CustomColor {
  main: string;
}

export interface CustomBackground {
  default: string;
  paper: string;
}

const DarkTheme = (
  mainColor?: CustomColor,
  secondaryColor?: CustomColor,
  backgroundObj?: { default: string; paper: string }
): Theme => {
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
      background: backgroundObj || {
        default: "#838e97", // Slightly lighter than before
        paper: "#838e97", // Slightly lighter than before
      },
      primary: {
        main: mainColor ? mainColor.main : "#0d3266", // Slightly lighter than before
      },
      secondary: {
        main: secondaryColor ? secondaryColor.main : "#f98d67", // Slightly lighter than before
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
