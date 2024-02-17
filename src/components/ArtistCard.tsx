import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ClaimPersonDialog from "./ClaimPersonDialog";
import { ArtistCardProps } from "../types/cards/ArtistCardProps";

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  fullname,
  images,
  isClaimed,
  roles,
  isDetails,
}) => {
  const theme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const imageToRender =
    images && images.length > 0 ? images[0].imageUrl : undefined;

  return (
    <React.Fragment>
      <div className="flex gap-4 text-center !w-96 h-40 p-2 bg-gray-400 rounded-md border-2 border-transparent hover:border-secondary">
        {/* Avatar Column */}
        <div className="flex-shrink-0 flex items-center">
          <Avatar
            className="!w-24 !h-24 border border-primary hover:border-secondary shadow-lg transition-all"
            alt="Artist Photo"
            src={imageToRender || ""}
            style={{ width: "100%", height: "auto", background: "transparent" }}
          >
            {/* {!imageToRender && <Typography>{fullname[0]}</Typography>}{" "} */}
            {/* Show initials if no image */}
          </Avatar>
        </div>
        {/* Info Column */}
        <div className="flex flex-col justify-center items-start">
          <Typography variant="body1" component="p" className="!font-semibold">
            {fullname}
          </Typography>
          <div className="flex flex-wrap items-center">
            {roles?.length ? (
              roles?.map((role, index) => (
                <React.Fragment key={index}>
                  <Typography
                    variant="body1"
                    component="span"
                    className="italic !text-sm"
                  >
                    {role}
                  </Typography>
                  {index < roles.length - 1 && (
                    <Typography
                      variant="body1"
                      component="span"
                      className="!mx-2 !font-bold"
                    >
                      •
                    </Typography>
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography
                variant="body1"
                component="span"
                className="italic !text-xs"
              >
                Δεν υπάρχουν διαθέσιμοι ρόλοι
              </Typography>
            )}
          </div>
          {/* TODO: Add most recent production */}
          {/* Include more artist info here */}
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
