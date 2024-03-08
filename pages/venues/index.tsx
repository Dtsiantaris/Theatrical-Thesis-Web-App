import { useState, useEffect } from "react";
// next
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
// mui
import {
  Drawer,
  Fab,
  Hidden,
  Button,
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
// icons
import FilterListIcon from "@mui/icons-material/FilterList";
// interfaces
import { Venue } from "../../src/types/entities/Venue";
// components
import PaginationPage from "../../src/components/PaginationPage";
// utils
import { mainFetcher } from "../../src/utils/AxiosInstances";

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
      `/venues?page=${page - 1}&size=12&alphabeticalOrder=true`
    );
  } else if (query.place) {
    data = await mainFetcher(
      encodeURI(`/venues?addressSearch=${query.place}&page=${page - 1}&size=12`)
    );
    console.log(data);
  } else {
    data = await mainFetcher(`/venues?page=${page - 1}&size=12`);
  }
  console.log(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const Filters = (
    <div className="w-[300px] mt-20 flex flex-col items-center gap-5">
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
      <Hidden mdUp>
        <div className="fixed bottom-5 right-5 z-30">
          <Fab color="secondary" onClick={() => setDrawer(true)}>
            <FilterListIcon />
          </Fab>
        </div>
        <Drawer
          classes={{ paper: "overflow-hidden" }}
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
        >
          {Filters}
        </Drawer>
      </Hidden>

      <div className="mx-0 my-auto flex p-4 md:pl-[70px]">
        <Hidden mdDown>{Filters}</Hidden>
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
