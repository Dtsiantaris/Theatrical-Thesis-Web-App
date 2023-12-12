import { makeStyles, Drawer, Fab, Hidden, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import PaginationPage from "../../src/components/PaginationPage";
import { Venue } from "../../src/types/Venue";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import style from "../../src/assets/jss/layouts/venuesPageStyle";
import Head from "next/head";
import { GetServerSideProps } from "next";

const useStyles = makeStyles(style);

const optionsArray = ["True", "False"];
const placeArray = ["Αθήνα", "Κολωνάκι", "Πειραιάς", "Φάληρο", "Δράμα"];

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: "/venues?page=1",
        permanent: false,
      },
    };
  }

  let data;
  const page = Number(query.page);

  if (query.order) {
    data = await mainFetcher(
      `/venues?page=${page - 1}&size=20&alphabeticalOrder=true`
    );
  } else if (query.place) {
    data = await mainFetcher(
      encodeURI(`/venues?addressSearch=${query.place}&page=${page - 1}&size=20`)
    );
    console.log(data);
  } else {
    data = await mainFetcher(`/venues?page=${page - 1}&size=20`);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  const venues = data.results;

  const pageCount = data.totalPages;

  return {
    props: {
      venues,
      pageCount,
      page,
    },
  };
};

interface VenuesPaginationProps {
  venues: Venue[];
  pageCount: number;
  page: number;
}
const VenuesPagination = ({
  venues,
  pageCount,
  page,
}: VenuesPaginationProps) => {
  const [drawer, setDrawer] = useState(false);
  const [ordered, setOrdered] = useState<string | null>(null);
  const [places, setPlaces] = useState<string | null>(null);
  const classes = useStyles();
  const router = useRouter();

  const handleClear = () => {
    router.push({
      pathname: "/venues",
      query: {
        page: 1,
      },
    });
    setDrawer(false);
  };

  useEffect(() => {
    if (ordered) {
      router.push({
        pathname: "/venues",
        query: {
          page: 1,
          order: ordered,
        },
      });
      setDrawer(false);
    }
  }, [ordered]);

  useEffect(() => {
    if (places) {
      router.push({
        pathname: "/venues",
        query: {
          page: 1,
          place: places,
        },
      });
      setDrawer(false);
    }
  }, [places]);

  const Filters = (
    <div className={classes.filtersContainer}>
      {console.log("Rendering Filters")}
      <Typography variant="h3" style={{ marginBottom: 30 }}>
        Φίλτρα
      </Typography>
      <Autocomplete
        value={ordered}
        onChange={(event, newValue) => {
          if (newValue != null) setOrdered(newValue);
        }}
        id="controllable-states-demo"
        options={optionsArray}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Ταξινομηση"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        value={places}
        onChange={(event, newValue) => {
          if (newValue != null) setPlaces(newValue);
        }}
        id="controllable-states-demo"
        options={placeArray}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Τοποθεσια"
            variant="outlined"
          />
        )}
      />
      <Button color="secondary" onClick={handleClear}>
        ΚΑΘΑΡΙΣΜΟΣ
      </Button>
    </div>
  );
  return (
    <>
      <Head>
        <title>Θεατρικοί Χώροι | Theatrica</title>
      </Head>
      <div>
        <div className={classes.fab}>
          <Fab color="secondary" onClick={() => setDrawer(true)}>
            <FilterListIcon />
          </Fab>
        </div>
        <Drawer
          classes={{ paper: classes.drawer }}
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          {Filters}
        </Drawer>
      </div>
      <div className={classes.venuesContainer}>
        <PaginationPage
          title="Θέατρα"
          items={venues}
          pageCount={pageCount}
          page={page}
          path="/venues"
        />
      </div>
    </>
  );
};

export default VenuesPagination;
