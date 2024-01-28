import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  Button,
  Fade,
  Typography,
} from "@mui/material";
import style from "../assets/jss/components/videoContainerStyle";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactPlayer from "react-player/youtube";
import AspectRatioSizer from "../utils/AspectRatioSizer";
import Link from "next/link";

const useStyles = makeStyles(style);

//FIXME: This interface is probably not the right one
interface Production {
  url: string;
  id: string;
  title: string;
  description: string;
}

interface VideoContainerProps {
  production: Production[];
}

const VideoContainer: React.FC<VideoContainerProps> = (props) => {
  const classes = useStyles();
  const [production, setProduction] = useState<Production>(props.production[0]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [descriptionExpanded, setDescriptionExpanded] =
    useState<boolean>(false);

  const handleNext = () => {
    const currentIndex = props.production.indexOf(production);
    if (currentIndex === props.production.length - 1) {
      setProduction(props.production[0]);
    } else {
      setProduction(props.production[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = props.production.indexOf(production);
    if (currentIndex === 0) {
      setProduction(props.production[props.production.length - 1]);
    } else {
      setProduction(props.production[currentIndex - 1]);
    }
  };

  const toggleDescription = () => {
    setDescriptionExpanded((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.bodyContainer}>
        <AspectRatioSizer widthRatio={16} heightRatio={9}>
          <ReactPlayer
            url={production.url}
            controls
            width="100%"
            height="100%"
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
            onEnded={() => {
              setPlaying(false);
            }}
          />
        </AspectRatioSizer>
        <Fade in={!playing}>
          <Button
            onClick={handlePrev}
            className={`${classes.button} ${classes.buttonPrev}`}
          >
            <NavigateBeforeRoundedIcon fontSize="large" />
          </Button>
        </Fade>
        <Fade in={!playing}>
          <Button
            onClick={handleNext}
            className={`${classes.button} ${classes.buttonNext}`}
          >
            <NavigateNextRoundedIcon fontSize="large" />
          </Button>
        </Fade>
      </div>
      <div className={classes.description}>
        <Link href={`shows/${production.id}`}>
          <Typography variant="h3" component="h2">
            {production.title}
          </Typography>
        </Link>
        <Typography
          component="p"
          variant="body2"
          className={!descriptionExpanded ? classes.descriptionHidden : ""}
        >
          {production.description}
        </Typography>
        <IconButton
          size="small"
          className={`${classes.expandButton} ${
            descriptionExpanded ? classes.collapseButton : ""
          }`}
          onClick={toggleDescription}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default VideoContainer;
