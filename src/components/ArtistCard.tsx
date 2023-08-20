import React from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import style from "../assets/jss/components/artistCardStyle";
import Image from "next/image";
import Link from "next/link";

const useStyles = makeStyles(style);

// Define the prop types for ArtistCard component
export interface ArtistCardProps {
  id: number; // Assuming it's a string, update the type accordingly if it's different
  fullname: string;
  systemId: number;
  image?: string; // Optional image URL, indicated by "?"
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, fullname, image }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <React.Fragment>
      <Link href={`/artists/${id}`}>
        <a className="linksNoDecoration">
          <div className={classes.container}>
            <Avatar
              className={`${classes.avatar} ${image && classes.transparent}`}
              alt="Artist Photo"
            >
              {image ? (
                <Image
                  src={image}
                  alt="Artist Photo"
                  width={300}
                  height={450}
                />
              ) : null}
            </Avatar>
            <Typography variant="body1" component="p" className={classes.name}>
              {fullname}
            </Typography>
          </div>
        </a>
      </Link>
    </React.Fragment>
  );
};

export default ArtistCard;
