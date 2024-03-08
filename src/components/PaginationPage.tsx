import React from "react";
// next
import { useRouter } from "next/router";
// mui
import { Grid, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
// components
import ItemsList from "./ItemsList";
// interfaces
import { ArtistCardProps } from "../types/cards/ArtistCardProps";
import { ShowCardProps } from "../types/cards/ShowCardProps";
import { VenueCardProps } from "../types/cards/VenueCardProps";

interface PaginationPageProps {
  items?: (ArtistCardProps | ShowCardProps | VenueCardProps)[];
  pageCount?: number;
  page?: number;
  path: "/artists" | "/shows" | "/venues";
  title?: string;
}

const PaginationPage: React.FC<PaginationPageProps> = ({
  items,
  pageCount,
  page,
  path,
  title,
}) => {
  const router = useRouter();

  // Ensure that the path is one of "/artists", "/shows", or "/venues"
  const type = ["/artists", "/shows", "/venues"].includes(path)
    ? path
    : "/artists";

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push({
      pathname: path,
      query: {
        ...router.query,
        page: value,
      },
    });
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      className="flex-grow min-w-0 py-0 pl-2 pr-20 mt-5 sm:pl-16 sm:mt-10"
    >
      {title && (
        <Grid item xs={12}>
          <div className="max-w-6xl mx-0 my-auto pl-2">
            <Typography
              variant="h2"
              component="h1"
              className="border-l-4 border-secondary pl-2"
            >
              {title}
            </Typography>
          </div>
        </Grid>
      )}
      <Grid item xs={12} className="my-0 ml-7 mr-12">
        {/* Pass the type prop to the ItemsList component */}
        <ItemsList items={items} type={type} />
      </Grid>
      <Grid item xs={12}>
        <div className="flex justify-center items-center">
          <Pagination
            count={pageCount || 10}
            page={page}
            color="secondary"
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default PaginationPage;
