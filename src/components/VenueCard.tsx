import {
  makeStyles,
  Card,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFavoriteVenue from "../hooks/useFavoriteVenue";
import { FC } from "react";
import { VenueCardProps } from "../types/cards/VenueCardProps";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const VenueCard: FC<VenueCardProps> = ({ id, title, address, width }) => {
  const { isFavorite, setIsFavorite } = useFavoriteVenue(id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      style={width ? { width: width } : undefined}
      className="relative hover:scale-105 hover:border-secondary transition-transform border rounded-md border-transparent"
    >
      <Link href={`/venues/${id}`}>
        <Card className="h-80 !w-full flex flex-col rounded-xl sm:w-44">
          <CardMedia className="relative w-full h-[70%] max-h-[70%]">
            <div className="relative h-full">
              <Image
                priority
                src="/show-placeholder.jpg"
                alt={`${title} thumbnail`}
                layout="fill"
                sizes=""
                objectFit="cover"
              />
            </div>
          </CardMedia>
          <div className="px-3 py-2 ">
            <Typography
              variant="body1"
              component="h2"
              className="!font-semibold line-clamp-2"
            >
              {title}
            </Typography>
          </div>
          <div className="px-3 flex flex-col">
            <div className="flex no-wrap items-center italic text-sm !line-clamp-1">
              <LocationOnIcon fontSize="small" />
              {address}
            </div>
          </div>
          <div
            className="flex justify-between pl-0 py-2 pr[9px]"
            style={{ justifyContent: "flex-end" }}
          >
            <IconButton
              size="small"
              className="hover:bg-transparent"
              onClick={handleFavorite}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default VenueCard;
