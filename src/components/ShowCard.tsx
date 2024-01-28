import React from "react";
import {
  makeStyles,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import useFavoriteShow from "../hooks/useFavoriteShow";
import useWatchlist from "../hooks/useWatchlist";

export interface ShowCardProps {
  id: number;
  title: string;
  media: string;
}

const ShowCard: React.FC<ShowCardProps> = ({ id, title, media }) => {
  const { isFavorite, setIsFavorite } = useFavoriteShow(id);
  const { inWatchlist, setInWatchlist } = useWatchlist(id);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleWatchlist = () => {
    setInWatchlist(!inWatchlist);
  };

  return (
    <div className="ml-3 mr-4 my-0 hover:-translate-y-[10px] hover:rounded-lg hover:border hover:border-purple-400 hover:shadow-sm transition-all">
      <Card className="h-80 w-16 flex flex-col rounded-xl sm:w-44">
        <CardMedia className="relative w-full h-[70%] max-h-[70%]">
          <Link href={`/shows/${id}`}>
            <div className="relative h-full">
              <Image
                src={media ? media : "/DefaultShowImage.jpg"}
                alt={`${title} thumbnail`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
        </CardMedia>
        <div className="px-[9px] py-[7px] h-1/3 max-h-[30%] flex flex-col justify-between last:pb-2 ">
          <Link href={`/shows/${id}`}>
            <Tooltip title={title}>
              <Typography variant="body1" component="h2">
                {title}
              </Typography>
            </Tooltip>
          </Link>
        </div>
        <div className="flex justify-between pl-0 py-2 pr[9px]">
          <IconButton
            size="small"
            className="hover:bg-transparent"
            onClick={handleWatchlist}
          >
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
    </div>
  );
};

export default ShowCard;
