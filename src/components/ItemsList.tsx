import React from "react";
import ArtistCard, { ArtistCardProps } from "./ArtistCard";
import { makeStyles } from "@material-ui/core";
import style from "../assets/jss/components/itemsListStyle";
import LoadingScene from "./LoadingScene";
import clsx from "clsx";
import ShowCard, { ShowCardProps } from "./ShowCard";
import VenueCard, { VenueCardProps } from "./VenueCard";

const useStyles = makeStyles(style);

export interface ItemsListProps {
  items?: (ArtistCardProps | ShowCardProps | VenueCardProps)[];
  type: "/artists" | "/shows" | "/venues";
}

const ItemsList: React.FC<ItemsListProps> = ({ items, type }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.container, {
        [classes.isLoading]: !items,
      })}
    >
      {items ? (
        items.map((item, index) => {
          if (type === "/artists" && "fullName" in item && "image" in item)
            return (
              <ArtistCard
                id={item.id}
                fullName={item.fullName}
                image={item.image}
                key={index}
              />
            );
          else if (type === "/shows" && "title" in item && "media" in item)
            return (
              <ShowCard
                id={item.id}
                title={item.title}
                media={item.media}
                key={index}
              />
            );
          else if (type === "/venues" && "title" in item)
            return <VenueCard id={item.id} title={item.title} key={index} />;
          return null;
        })
      ) : (
        <LoadingScene />
      )}
    </div>
  );
};

export default ItemsList;