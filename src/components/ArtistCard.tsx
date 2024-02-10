import React, { useState } from "react";
// next
import Image from "next/image";
import Link from "next/link";
// mui
import {
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
// icons
import CopyrightIcon from "@mui/icons-material/Copyright";
import ClaimPersonDialog from "./ClaimPersonDialog";

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

  const imageToRender = fetchedImage || image;
  return (
    <React.Fragment>
      <div className="flex flex-col items-center text-center w-32 p-2 sm:w-44">
        <Avatar
          className={`w-32 h-32 border-2 border-transparent hover:border-secondary shadow-md transition-all z-20 sm:w-40 sm:h-40 mt-2  ${
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
