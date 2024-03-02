import React, { useEffect, useState, useCallback } from "react";
// mui
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
// icons
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// swiper
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation]);

interface ContentSliderProps {
  title?: string;
  description?: string;
  decoratedTitle?: boolean;
  minHeight?: number; // in rem
  children: React.ReactNode[];
}

const ContentSlider: React.FC<ContentSliderProps> = (props) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

  const [progress, setProgress] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);

  let swiperRef: SwiperCore | null = null;

  useEffect(() => {
    if (isXlUp) {
      setSlidesPerView(5);
    } else if (isLgUp) {
      setSlidesPerView(4);
    } else if (isSmUp) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(2);
    }
  }, [isLgUp, isXlUp, isSmUp]);

  const slideByAmount = useCallback(
    (number: number) => {
      let i = 0;
      for (i; i > number; i--) {
        swiperRef?.slidePrev(1000);
      }
      for (i = 0; i < number; i++) {
        swiperRef?.slideNext(1000);
      }
    },
    [swiperRef]
  );

  const nextSlide = useCallback(() => {
    slideByAmount(slidesPerView);
  }, [slidesPerView, slideByAmount]);

  const prevSlide = useCallback(() => {
    slideByAmount(-slidesPerView);
  }, [slidesPerView, slideByAmount]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 ">
        <div>
          <Typography
            className={
              props.decoratedTitle ? "pl-2 border-l-4 border-secondary" : ""
            }
            variant="h4"
          >
            {props.title}
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {props.description}
          </Typography>
        </div>
        {slidesPerView < props.children.length && (
          <div className="hidden sm:block">
            <IconButton
              onClick={prevSlide}
              disabled={progress <= 0}
              className="hover:text-secondary"
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>
            <IconButton
              onClick={nextSlide}
              disabled={progress >= 1}
              className="hover:text-secondary"
            >
              <NavigateNextRoundedIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div className="my-2">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef = swiper;
          }}
          slidesPerView={slidesPerView}
          freeMode
          onProgress={(_swiper, newProgress) => {
            setProgress(newProgress);
          }}
        >
          {props.children.map((child, index) => (
            <SwiperSlide key={index}>
              <div
                className="p-3"
                style={{ minHeight: `${props.minHeight}rem` }}
              >
                {child}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContentSlider;
