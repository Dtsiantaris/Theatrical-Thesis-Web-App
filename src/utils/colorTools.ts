import { colord } from "colord";

export const generateWaveColors = (
  baseColor: string,
  numberOfVariations: number = 5
) => {
  const variations = numberOfVariations;
  const hueChange = 5; // Adjust the hue change
  const saturationChange = 0.05; // Adjust the saturation change
  const lightnessChange = 0.01; // Adjust the lightness change

  const waveColors = [];
  for (let i = 0; i < variations; i++) {
    const modifiedColor = colord(baseColor)
      .hue(colord(baseColor).hue() + i * hueChange)
      .saturate(i * saturationChange)
      .lighten(i * lightnessChange)
      .toHex();
    waveColors.push(modifiedColor);
  }

  return waveColors;
};

export interface ThemeObjectType {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  paper: string;
  "paper-bg": string;
  waveColors: string[];
}

export const themeObjects: ThemeObjectType[] = [
  {
    name: "Noir",
    primaryColor: "#0d3266", // blue navy
    secondaryColor: "#f98d67", // saturated orange
    paper: "#abb9c7", // light gray
    "paper-bg": "#838e97", // medium gray
    waveColors: generateWaveColors("#f98d67"),
  },
  {
    name: "Dark",
    primaryColor: "#000000", // black
    secondaryColor: "#ffd700", // gold
    paper: "#333333", // very dark gray
    "paper-bg": "#1e1e1e", // very dark gray
    waveColors: generateWaveColors("#ffd700"),
  },
  {
    name: "Grove",
    primaryColor: "#2e7d32", // green
    secondaryColor: "#d50000", // red
    paper: "#4c9850", // darker shade of primary
    "paper-bg": "red",
    waveColors: generateWaveColors("#d50000"),
  },
];
