import React from "react";
// mui
import { Typography, Avatar, useTheme } from "@mui/material";
// interfaces
import { ArtistCardProps } from "../types/cards/ArtistCardProps";
import Link from "next/link";

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  fullname,
  images,
  isClaimed,
  roles,
  isDetails,
  width,
}) => {
  const theme = useTheme();

  const imageToRender =
    images && images.length > 0 ? images[0].imageUrl : undefined;

  return (
    <React.Fragment>
      <div
        style={width ? { width: width } : undefined}
        className="relative hover:scale-105 hover:border-secondary transition-transform  text-center p-2 bg-gray-400 rounded-md border-2 border-transparent"
      >
        <Link href={`/artists/${id}`}>
          <div className="flex gap-4 text-center p-2 bg-gray-400 h-40">
            {/* Avatar Column */}
            <div className="flex-shrink-0 flex items-center">
              <Avatar
                className="!w-24 !h-24 border border-primary hover:border-secondary shadow-lg transition-all"
                alt="Artist Photo"
                src={imageToRender || ""}
                style={{
                  width: "100%",
                  height: "auto",
                  background: "transparent",
                }}
              ></Avatar>
            </div>
            {/* Info Column */}
            <div className="flex flex-col justify-center items-start text-start">
              <Typography
                variant="body1"
                component="p"
                className="!font-semibold"
              >
                {fullname}
              </Typography>
              <div className="flex flex-col items-start">
                {roles?.length ? (
                  roles?.map((role, index) => (
                    <React.Fragment key={index}>
                      <Typography
                        variant="body1"
                        component="span"
                        className="italic !text-sm items-center"
                      >
                        • {role}
                      </Typography>
                      {/* {index < roles.length - 1 && (
                    <Typography
                      variant="body1"
                      component="span"
                      className="!mx-2 !font-bold"
                    >
                      •
                    </Typography>
                  )} */}
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
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ArtistCard;
