import React from "react";
import { Typography, LinearProgress } from "@mui/material";
import clsx from "clsx";

interface LoadingSceneProps {
  fullScreen?: boolean;
}

const LoadingScene: React.FC<LoadingSceneProps> = ({ fullScreen }) => {
  return (
    <div
      className={clsx(
        "h-full w-full flex flex-col items-center justify-center",
        {
          ["h-[calc(100vh-64px)]"]: fullScreen,
        }
      )}
    >
      <Typography variant="h5" className="p-4 mb-[3%]">
        Interviewing actors. Please wait...
      </Typography>
      <LinearProgress color="secondary" className="w-3/5" />
    </div>
  );
};

export default LoadingScene;
