import React, { useRef, useEffect } from "react";
import { Divider } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { WavyBackground } from "../common/WavyBackground";
import { generateWaveColors } from "../../utils/colorTools";

export const ThemeSelectionTab = () => {
  const { user } = useUserContext();
  const swiperRef = useRef(null); // Ref for Swiper instance

  const themeObjects = [
    {
      primaryColor: "#0d3266", // blue navy
      secondaryColor: "#f98d67", // saturated orange
      paper: "#1e4b83", // darker shade of primary
      waveColors: generateWaveColors("#f98d67"),
    },
    {
      primaryColor: "#000000", // purple
      secondaryColor: "#ffca3a", // yellow
      paper: "#854a80", // darker shade of primary
      waveColors: generateWaveColors("#ffca3a"),
    },
    {
      primaryColor: "#2e7d32", // green
      secondaryColor: "#d50000", // red
      paper: "#4c9850", // darker shade of primary
      waveColors: generateWaveColors("#d50000"),
    },
  ];

  useEffect(() => {
    if (swiperRef.current) {
      // Set initial slide to the 3rd image (index 2)
      swiperRef.current.swiper.slideTo(2);
    }
  }, []);

  return (
    <>
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  text-white bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex gap-2 items-center text-xl md:text-4xl font-bold">
          Theme
          <ImportContactsIcon />
        </div>
        <Divider color="white" />
        {/* Content */}
        <div className="flex justify-center">
          <Swiper
            ref={swiperRef} // Attach ref to Swiper instance
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            navigation={true}
            slidesPerGroup={1}
            modules={[EffectCoverflow, Pagination]}
            className="!w-full !py-10"
          >
            {themeObjects.map((theme, index) => (
              <SwiperSlide
                key={index}
                className="!w-[400px] !h-[400px] !bg-center !bg-cover !overflow-hidden !rounded-lg"
              >
                <WavyBackground
                  position={0.25}
                  backgroundFill={theme.primaryColor}
                  colors={theme.waveColors}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
