import React from "react";
// next
import Image from "next/image";
import Link from "next/link";
// mui
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
// icons
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TheatersIcon from "@mui/icons-material/Theaters";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
// hooks
import useFavoriteShow from "../hooks/useFavoriteShow";
import useWatchlist from "../hooks/useWatchlist";
// interfaces
import { ShowCardProps } from "../types/cards/ShowCardProps";

const ShowCard: React.FC<ShowCardProps> = ({
  id,
  title,
  mediaUrl,
  duration,
  producer,
}) => {
  const { isFavorite, setIsFavorite } = useFavoriteShow(id);
  const { inWatchlist, setInWatchlist } = useWatchlist(id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleWatchlist = () => {
    setInWatchlist(!inWatchlist);
  };

  return (
    // TODO: maybe the h-80 needs to be dynamic??
    <div className="relative hover:scale-105 hover:border-secondary transition-transform">
      <Link href={`/shows/${id}`}>
        <Card className="flex flex-col !rounded-[4%] h-96 bg-gray-400 overflow-hidden shadow-sm border-2 border-transparent hover:border-secondary hover:shadow-md transition-all">
          <CardMedia className="relative w-full h-[70%] max-h-[70%]">
            <div className="relative h-full">
              <Image
                src={mediaUrl ? mediaUrl : "/show-placeholder.jpg"}
                alt={`${title} thumbnail`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardMedia>

          <div className="px-[9px] py-[7px] h-1/3 max-h-[30%] flex flex-col justify-between last:pb-2 ">
            <Typography
              variant="body1"
              component="h2"
              className="!font-semibold line-clamp-2"
            >
              {title}
            </Typography>
            <div className="flex flex-col">
              <div className="flex no-wrap items-center italic text-sm !line-clamp-1">
                <TheatersIcon fontSize="small" />
                {producer}
              </div>
              <div className="flex italic text-sm">
                <TimelapseIcon fontSize="small" />
                {duration || "Μη διαθέσιμο"}
              </div>
            </div>
          </div>
          <div className="flex justify-between pl-0 py-2 pr[9px]">
            <IconButton
              size="small"
              className="hover:bg-transparent"
              onClick={handleWatchlist}
            >
              {/* TODO: this should also add it do the user's watchlist, if he is logged */}
              {inWatchlist ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
            </IconButton>
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

export default ShowCard;
