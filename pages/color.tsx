import { useState, useContext } from "react";
// next
import Head from "next/head";
// mui
import { Typography, Paper, Button } from "@mui/material";
// theme
import { ThemeContext } from "../src/contexts/ThemeContext";
// utils
import { HexColorPicker } from "react-colorful";
import { colord } from "colord";

const ColorPage = () => {
  const [mainColor, setMainColor] = useState("#fff");
  const [secondaryColor, setSecondaryColor] = useState("#fff");
  const {
    setMainColor: setThemeMainColor,
    setSecondaryColor: setThemeSecondaryColor,
  } = useContext(ThemeContext);

  const handleMainColorChange = (color: string) => {
    setMainColor(color);
  };

  const handleSecondaryColorChange = (color: string) => {
    setSecondaryColor(color);
  };

  const handleClick = () => {
    const chosenMainColor = colord(mainColor).toHsl();
    const chosenSecondaryColor = colord(secondaryColor).toHsl();

    const lightMainColor = chosenMainColor;
    const darkMainColor = chosenMainColor;

    lightMainColor.l += 20;
    darkMainColor.l -= 20;

    const mainColorObject = {
      light: colord(lightMainColor).toHex(),
      main: colord(chosenMainColor).toHex(),
      dark: colord(darkMainColor).toHex(),
    };

    const lightSecondaryColor = chosenSecondaryColor;
    const darkSecondaryColor = chosenSecondaryColor;

    lightSecondaryColor.l += 20;
    darkSecondaryColor.l -= 20;

    const secondaryColorObject = {
      light: colord(lightSecondaryColor).toHex(),
      main: colord(chosenSecondaryColor).toHex(),
      dark: colord(darkSecondaryColor).toHex(),
    };

    setThemeMainColor(mainColorObject);
    document.documentElement.style.setProperty("--primary-color", mainColor);
    setThemeSecondaryColor(secondaryColorObject);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );
  };

  return (
    <>
      <Head>
        <title>Χρώματα | Theatrica</title>
      </Head>
      <div className="pageWrapper mt-20">
        <div className="pageContent">
          <Typography variant="h2" component="h1">
            Διαλέξτε Χρώμα
          </Typography>
          <Paper className="flex flex-col  gap-[50px] mt-7 p-5" elevation={3}>
            <div className="flex gap-2 lg:flex-nowrap flex-wrap">
              <div className="w-full">
                <Typography
                  variant="h2"
                  component="h2"
                  className="!font-medium !mb-4"
                >
                  Κύριο Χρώμα
                </Typography>
                <HexColorPicker
                  color={mainColor}
                  onChange={handleMainColorChange}
                  style={{ width: "400px", height: "400px" }}
                />
              </div>
              <div>
                <Typography
                  variant="h2"
                  component="h2"
                  className="!font-medium !mb-4"
                >
                  Δευτερεύον Χρώμα
                </Typography>
                <HexColorPicker
                  color={secondaryColor}
                  onChange={handleSecondaryColorChange}
                  style={{ width: "400px", height: "400px" }}
                />
              </div>
            </div>
            <Button
              onClick={handleClick}
              variant="contained"
              className="hover:!bg-secondary"
              color="secondary"
              style={{ alignSelf: "flex-end" }}
            >
              Εφαρμογη
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ColorPage;
