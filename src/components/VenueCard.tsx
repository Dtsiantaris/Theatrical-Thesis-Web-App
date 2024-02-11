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

const VenueCard: FC<VenueCardProps> = ({ id, title }) => {
  const { isFavorite, setIsFavorite } = useFavoriteVenue(id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="ml-3 mr-4 my-0 hover:-translate-y-[10px] hover:rounded-lg hover:border hover:border-purple-400 hover:shadow-sm transition-all">
      <Card className="h-80 w-16 flex flex-col rounded-xl sm:w-44">
        <CardMedia className="relative w-full h-[70%] max-h-[70%]">
          <Link href={`/venues/${id}`}>
            <div className="relative h-full">
              <Image
                priority
                src="/DefaultShowImage.jpg"
                alt={`${title} thumbnail`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
        </CardMedia>
        <div className="px-[9px] py-[7px] h-1/3 max-h-[30%] flex flex-col justify-between last:pb-2 ">
          <Link href={`/venues/${id}`}>
            <Typography variant="body1" component="h2">
              {title}
            </Typography>
          </Link>
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
    </div>
  );
};

export default VenueCard;
