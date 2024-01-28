import React from "react";
import { makeStyles, Theme } from "@mui/material";

const style = (theme: Theme) => ({
  aspectRatioSizer: {
    display: "grid",
    "& > *": {
      gridArea: "1 / 1 / 2 / 2",
    },
    width: "100%",
  },
});

const useStyles = makeStyles(style);

interface AspectRatioSizerProps {
  widthRatio: number;
  heightRatio: number;
  children: React.ReactNode;
}

function AspectRatioSizer(props: AspectRatioSizerProps) {
  const { widthRatio, heightRatio, children } = props;
  const classes = useStyles();

  return (
    <div className={classes.aspectRatioSizer}>
      <svg viewBox={`0 0 ${widthRatio} ${heightRatio}`}></svg>
      {children}
    </div>
  );
}

export default AspectRatioSizer;
