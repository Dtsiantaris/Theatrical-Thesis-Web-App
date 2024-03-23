import React, { useRef, useEffect, useState, useContext } from "react";
import { Divider, IconButton } from "@mui/material";
import { useUserContext } from "../../contexts/UserContext";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { SwiperSlide, Swiper } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { WavyBackground } from "../common/WavyBackground";
import {
  ThemeObjectType,
  generateWaveColors,
  themeObjects,
} from "../../utils/colorTools";
import SaveIcon from "@mui/icons-material/Save";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CustomBackground, CustomColor } from "../../assets/themes/DarkTheme";

export const ThemeSelectionTab = () => {
  const { user } = useUserContext();
  const swiperRef = useRef(null);
  const {
    setMainColor: setThemeMainColor,
    setSecondaryColor: setThemeSecondaryColor,
    setBackgroundObj: setThemeBackgroundObj,
  } = useContext(ThemeContext);

  const [selected, setSelected] = useState<ThemeObjectType>(themeObjects[0]);

  const handleClick = () => {
    const primary: CustomColor = { main: selected.primaryColor };
    const secondary: CustomColor = { main: selected.secondaryColor };
    const background: CustomBackground = {
      default: selected["paper-bg"],
      paper: selected.paper,
    };

    localStorage.setItem("theme", JSON.stringify(selected));

    setThemeMainColor(primary);
    document.documentElement.style.setProperty("--primary-color", primary.main);
    setThemeSecondaryColor(secondary);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondary.main
    );
    setThemeBackgroundObj(background);
    document.documentElement.style.setProperty(
      "--paper-color",
      background.paper
    );
    document.documentElement.style.setProperty(
      "--paper-bg-color",
      background.default
    );
  };

  useEffect(() => {
    if (swiperRef.current) {
      // Set initial slide to the 3rd image (index 2)
      swiperRef.current.swiper.slideTo(2);
    }
  }, []);

  return (
    <>
      {/* TODO: fix the text color contrast */}
      <div className="relative shadow-2xl flex flex-col gap-3 w-full h-full rounded-2xl p-10  !mix-blend-multiply bg-gradient-to-br from-primary to-indigo-900">
        {/* Title */}
        <div className="flex justify-between gap-2 items-center text-xl md:text-4xl font-bold">
          <div className="flex items-center gap-2 no-wrap mix-blend-hard-light">
            Theme
            <ImportContactsIcon />
          </div>
          <IconButton color="secondary" onClick={handleClick}>
            <SaveIcon />
          </IconButton>
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
            onSlideChange={(swiper) => {
              const currentIndex = swiper.activeIndex;
              setSelected(themeObjects[currentIndex]);
            }}
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
                >
                  <div className="!text-xl py-2 px-10 bg-gray-800 bg-opacity-30 rounded-lg">
                    {theme.name}
                  </div>
                </WavyBackground>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
