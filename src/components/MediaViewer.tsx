import { useState, useEffect } from "react";
// mui
import { IconButton, Typography } from "@mui/material";
// icons
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// utils
import useScrollbarSize from "react-scrollbar-size";
import Image from "next/image";

interface MediaViewerProps {
  media: string[];
  currentImage: number;
  setVisibility: (visibility: boolean) => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  media,
  currentImage,
  setVisibility,
}) => {
  const [mediaIndex, setMediaIndex] = useState(currentImage);
  const { width: scrollBarWidth } = useScrollbarSize();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.getElementById(
      "navbar"
    )!.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "unset";
      document.getElementById("navbar")!.style.paddingRight = "unset";
    };
  }, [scrollBarWidth]);

  const handleClickAway = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((event.target as Element).id === "modal") {
      setVisibility(false);
    }
  };

  const handlePrev = () => {
    setMediaIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setMediaIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 bg-black bg-opacity-90"
      onClick={handleClickAway}
    >
      {/* Close button */}
      <div className="absolute top-20 right-20 bg-secondary rounded-full">
        <IconButton
          aria-label="close media viewer"
          onClick={() => setVisibility(false)}
        >
          <CloseRoundedIcon fontSize="large" />
        </IconButton>
      </div>
      {/* Nav buttons */}
      <div className="absolute flex gap-3 bottom-20 right-20">
        <IconButton
          className={
            mediaIndex === 0 ? "!bg-secondary !bg-opacity-50" : "!bg-secondary"
          }
          disabled={mediaIndex === 0}
          aria-label="previous media"
          onClick={handlePrev}
        >
          <NavigateBeforeRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton
          className={
            mediaIndex === media.length - 1
              ? "!bg-secondary !bg-opacity-50"
              : "!bg-secondary"
          }
          disabled={mediaIndex === media.length - 1}
          aria-label="next media"
          onClick={handleNext}
        >
          <NavigateNextRoundedIcon fontSize="large" />
        </IconButton>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
        <Image
          src={media[mediaIndex]}
          alt="Profile picture"
          layout="responsive"
          loading="lazy"
          width={400}
          height={400}
        />
        <Typography
          className=" text-white bg-primary p-1 px-3 rounded-2xl"
          variant="body1"
        >{`${mediaIndex + 1} / ${media.length}`}</Typography>
        {/* Preview images */}
        <div className="flex no-wrap justify-center items-center gap-1 mt-2">
          {media.map((image, index) => (
            <div
              key={index}
              className={
                mediaIndex === index
                  ? "hover:cursor-pointer w-16 h-16 flex no-wrap border-2 border-secondary"
                  : "hover:cursor-pointer w-16 h-16 flex no-wrap opacity-40"
              }
              onClick={() => setMediaIndex(index)}
            >
              <Image
                src={image}
                alt={`Preview ${index}`}
                layout="fixed"
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaViewer;
