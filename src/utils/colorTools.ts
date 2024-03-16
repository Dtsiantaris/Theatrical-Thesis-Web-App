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
