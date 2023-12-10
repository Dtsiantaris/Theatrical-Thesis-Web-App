import React from "react";
import ArtistCard, { ArtistCardProps } from "./ArtistCard";
import { makeStyles } from "@material-ui/core";
import style from "../assets/jss/components/itemsListStyle";
import LoadingScene from "./LoadingScene";
import clsx from "clsx";
import ShowCard, { ShowCardProps } from "./ShowCard";
import VenueCard, { VenueCardProps } from "./VenueCard";
import Link from "next/link";

const useStyles = makeStyles(style);

export interface ItemsListProps {
  items?: (ArtistCardProps | ShowCardProps | VenueCardProps)[];
  type: "/artists" | "/shows" | "/venues";
}

const ItemsList: React.FC<ItemsListProps> = ({ items, type }) => {
  // console.log("ItemsList Props:", items, type);
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.container, {
        [classes.isLoading]: !items,
      })}
    >
      {items ? (
        items.map((item, index) => {
          // console.log("Item in loop:", item);
          if (type === "/artists" && "fullname" in item) {
            // console.log("Item in loop checked:", item);

            return (
              <Link href={`/artists/${item.id}`} key={item.id}>
                <div className="linksNoDecoration">
                  <ArtistCard
                    id={item.id}
                    fullname={item.fullname}
                    image={item.image}
                    systemId={item.systemId}
                  />
                </div>
              </Link>
            );
          } else if (type === "/shows" && "title" in item && "media" in item)
            return (
              <Link href={`/shows/${item.id}`} key={item.id}>
                <div className="linksNoDecoration">
                  <ShowCard
                    id={item.id}
                    title={item.title}
                    media={item.media}
                  />
                </div>
              </Link>
            );
          else if (type === "/venues" && "title" in item)
            return (
              <Link href={`/venues/${item.id}`} key={item.id}>
                <div className="linksNoDecoration">
                  <VenueCard id={item.id} title={item.title} />
                </div>
              </Link>
            );
          return null;
        })
      ) : (
        <LoadingScene />
      )}
    </div>
  );
};

export default ItemsList;
