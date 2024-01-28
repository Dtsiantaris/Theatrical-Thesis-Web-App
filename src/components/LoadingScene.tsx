import React from "react";
import { Typography, LinearProgress, makeStyles } from "@mui/material";
import style from "../assets/jss/components/loadingSceneStyle";
import clsx from "clsx";

const useStyles = makeStyles(style);

interface LoadingSceneProps {
  fullScreen?: boolean;
}

const LoadingScene: React.FC<LoadingSceneProps> = ({ fullScreen }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.loading, {
        [classes.fullScreen]: fullScreen,
      })}
    >
      <Typography variant="h5" className={classes.title}>
        Interviewing actors. Please wait...
      </Typography>
      <LinearProgress color="secondary" className={classes.progressBar} />
    </div>
  );
};

export default LoadingScene;
