import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import style from "../assets/jss/layouts/paginationPageStyle";
import { Pagination } from "@material-ui/lab";
import { ArtistCardProps } from "./ArtistCard";
import { ShowCardProps } from "./ShowCard";
import { VenueCardProps } from "./VenueCard";
import ItemsList from "./ItemsList";
import { useRouter } from "next/router";

const useStyles = makeStyles(style);

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
  const classes = useStyles();
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
    <Grid container className={classes.grid} justify="center">
      {title && (
        <Grid item xs={12}>
          <div className={classes.headingContainer}>
            <Typography variant="h2" component="h1">
              {title}
            </Typography>
          </div>
        </Grid>
      )}
      <Grid item xs={12} className={classes.list}>
        {/* Pass the type prop to the ItemsList component */}
        <ItemsList items={items} type={type} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.paginationContainer}>
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
