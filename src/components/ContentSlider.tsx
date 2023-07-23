import React, { useEffect, useState, useCallback } from "react";
import {
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import style from "../assets/jss/components/contentSliderStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import clsx from "clsx";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

const useStyles = makeStyles(style);

interface ContentSliderProps {
  title: string;
  description: string;
  decoratedTitle?: boolean;
  children: React.ReactNode[];
}

const ContentSlider: React.FC<ContentSliderProps> = (props) => {
  const classes = useStyles();
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
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div>
          <Typography
            className={clsx({ [classes.title]: props.decoratedTitle })}
            variant="h3"
            component="h2"
          >
            {props.title}
          </Typography>
          <Typography variant="subtitle1" component="h3">
            {props.description}
          </Typography>
        </div>
        {slidesPerView < props.children.length && (
          <div className={classes.buttonsContainer}>
            <IconButton
              onClick={prevSlide}
              disabled={progress <= 0}
              className={classes.button}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>
            <IconButton
              onClick={nextSlide}
              disabled={progress >= 1}
              className={classes.button}
            >
              <NavigateNextRoundedIcon />
            </IconButton>
          </div>
        )}
      </div>
      <div className={classes.swiper}>
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
            <SwiperSlide key={index} className={classes.slide}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ContentSlider;
