import React, { useEffect, useState } from "react";
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
import { mainFetcher } from "../utils/AxiosInstances";

const useStyles = makeStyles(style);

// Define the prop types for ArtistCard component
export interface ArtistCardProps {
  id: number; // Assuming it's a string, update the type accordingly if it's different
  fullname: string;
  systemId: number;
  image?: string; // Optional image URL, indicated by "?"
}

const ArtistCard: React.FC<ArtistCardProps> = ({ id, fullname, image }) => {
  console.log("ArtistCard Props:", id, fullname, image);
  const classes = useStyles();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [fetchedImage, setFetchedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // Fetch the image URL only if it's not provided as a prop
    if (!image) {
      const fetchImage = async () => {
        try {
          const response = await mainFetcher(`/people/${id}/photos`);

          // Assuming the response is an array of image URLs, you can update the logic here based on your API response
          console.log(response[0].imageUrl);
          const fetchedImage = response[0].imageUrl; // Get the fetched image URL

          // You can use a state management library like Redux to update the image prop globally across components,
          // or you can lift the state up to a common parent component and pass the fetched image URL as a prop to all child components that need it.
          // For simplicity, I'm updating the image prop directly here, but this may not work well for a complex application.
          // Update the image prop with the fetched image URL
          if (fetchedImage) setFetchedImage(fetchedImage as string);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      fetchImage(); // Call the fetchImage function
    }
  }, [id, image]);

  const imageToRender = fetchedImage || image;
  return (
    <React.Fragment>
      <Link href={`/artists/${id}`}>
        <a className="linksNoDecoration">
          <div className={classes.container}>
            <Avatar
              className={`${classes.avatar} ${
                imageToRender && classes.transparent
              }`}
              alt="Artist Photo"
            >
              {imageToRender ? (
                <Image
                  src={imageToRender}
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
