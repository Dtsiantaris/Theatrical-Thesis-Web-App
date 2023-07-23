import { createMuiTheme, responsiveFontSizes, Theme } from "@material-ui/core";

// Define interface for custom color object used in the theme
interface CustomColor {
  light: string;
  main: string;
  dark: string;
}

const DarkTheme = (secondaryColor?: CustomColor): Theme => {
  let theme = createMuiTheme({
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
        default: "#191919",
        paper: "#2A2A2A",
      },
      primary: {
        light: "#303030",
        main: "#1D1D1D",
        dark: "#212121",
      },
      secondary: {
        light: secondaryColor ? secondaryColor.light : "#AAFFFF",
        main: secondaryColor ? secondaryColor.main : "#71FFFA",
        dark: secondaryColor ? secondaryColor.dark : "#2ECBC7",
      },
      type: "dark",
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
  return createMuiTheme({
    palette: {
      primary: {
        main: color.main,
      },
      type: "dark",
    },
  });
};

export default DarkTheme;
