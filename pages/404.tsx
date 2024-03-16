import Head from "next/head";
import { useEffect, useState } from "react";
import { WavyBackground } from "../src/components/common/WavyBackground";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { generateWaveColors } from "../src/utils/colorTools";

export default function Custom404() {
  const [primaryColor, setPrimaryColor] = useState("#fff");
  const [waveColors, setWaveColors] = useState<string[]>([]);

  useEffect(() => {
    // Get the primary color from CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const color = rootStyles.getPropertyValue("--primary-color");
    const secondary = rootStyles.getPropertyValue("--secondary-color");

    setPrimaryColor(color);
    const generatedWaveColors = generateWaveColors(secondary);
    setWaveColors(generatedWaveColors);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Δεν βρέθηκε η σελίδα!</title>
      </Head>
      <div className="pageWrapper">
        <div className="pageContent">
          <WavyBackground
            className="max-w-full"
            backgroundFill={primaryColor}
            colors={waveColors}
          >
            <div className="animate-shake mt-44 flex flex-col gap-10 justify-center items-center h-full text-2xl md:text-4xl lg:text-7xl text-white font-semibold text-center">
              <p>404</p>
              <p>Η σελίδα δεν βρέθηκε!</p>
              <Link
                href="/"
                className="flex border p-2 rounded-md border-secondary bg-secondary items-center gap-1 !text-xl md:text-3xl lg:text-6xl"
              >
                <HomeIcon />
                Επιστροφή στην Αρχική
              </Link>
            </div>
          </WavyBackground>
        </div>
      </div>
    </>
  );
}
