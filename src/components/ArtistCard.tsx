import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { mainFetcher } from "../utils/AxiosInstances";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ClaimPersonDialog from "./ClaimPersonDialog";
import { Person } from "../types/entities/Person";

// Define the prop types for ArtistCard component
export interface ArtistCardProps {
  id: number; // Assuming it's a string, update the type accordingly if it's different
  fullname: string;
  systemId: number;
  isDetails?: boolean;
  image?: string; // Optional image URL, indicated by "?"
  isClaimed?: boolean;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  fullname,
  image,
  isClaimed,
  isDetails,
}) => {
  console.log("ArtistCard Props:", id, fullname, image);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [fetchedImage, setFetchedImage] = useState<string | undefined>(
    undefined
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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
      <div className="flex flex-col items-center text-center w-32 p-2 sm:w-44">
        <Avatar
          className={`w-32 h-32 border-2 border-transparent hover:border-purple-400 shadow-md transition-all z-20 sm:w-40 sm:h-40 mt-2  ${
            imageToRender && "bg-transparent"
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
        <Typography variant="body1" component="p" className="mt-2">
          {fullname}
        </Typography>
        {!isClaimed && isDetails && (
          <Button
            style={{ textTransform: "none" }}
            variant="outlined"
            color="secondary"
            onClick={handleOpenDialog}
            endIcon={<CopyrightIcon />}
          >
            Claim profile
          </Button>
        )}
      </div>
      <ClaimPersonDialog
        personId={id}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </React.Fragment>
  );
};

export default ArtistCard;
