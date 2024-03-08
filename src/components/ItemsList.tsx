import React from "react";
// next
import Link from "next/link";
// components
import LoadingScene from "./LoadingScene";
import ArtistCard from "./ArtistCard";
import ShowCard from "./ShowCard";
import VenueCard from "./VenueCard";
// interfaces
import { ShowCardProps } from "../types/cards/ShowCardProps";
import { ArtistCardProps } from "../types/cards/ArtistCardProps";
import { VenueCardProps } from "../types/cards/VenueCardProps";
// utils
import clsx from "clsx";
export interface ItemsListProps {
  items?: (ArtistCardProps | ShowCardProps | VenueCardProps)[];
  type: "/artists" | "/shows" | "/venues";
}

const ItemsList: React.FC<ItemsListProps> = ({ items, type }) => {
  // console.log("ItemsList Props:", items, type);

  return (
    <div
      className={clsx(
        "flex w-full mx-0 my-auto flex-wrap gap-5 justify-center items-center p-3",
        {
          ["p-52"]: !items,
        }
      )}
    >
      {items ? (
        items.map((item, index) => {
          // console.log("Item in loop:", item);
          if (type === "/artists" && "fullname" in item) {
            // console.log("Item in loop checked:", item);

            return (
              <ArtistCard
                key={index}
                id={item.id}
                fullname={item.fullname}
                images={item.images}
                systemId={item.systemId}
                roles={item.roles}
                width={380}
              />
            );
          } else if (type === "/shows" && "duration" in item)
            return (
              <ShowCard
                key={index}
                id={item.id}
                description={item.description}
                mediaUrl={item.mediaUrl}
                duration={item.duration}
                organizerId={item.organizerId}
                title={item.title}
                producer={item.producer}
                url={item.url}
                width={380}
              />
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
