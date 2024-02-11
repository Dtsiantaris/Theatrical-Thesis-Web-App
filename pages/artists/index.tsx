import { useEffect, useState } from "react";
// next
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
// mui
import { Typography } from "@mui/material";
import {
  Hidden,
  Drawer,
  Fab,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
// icons
import FilterListIcon from "@mui/icons-material/FilterList";
// components
import PaginationPage from "../../src/components/PaginationPage";
//utils
import { mainFetcher } from "../../src/utils/AxiosInstances";
// interfaces
import { ArtistCardProps } from "../../src/types/cards/ArtistCardProps";

interface ArtistsPaginationProps {
  artists: ArtistCardProps[];
  pageCount: number;
  page: number;
}

export const getServerSideProps: GetServerSideProps<
  ArtistsPaginationProps
> = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: "/artists?page=1",
        permanent: false,
      },
    };
  }

  let data;

  const page = Number(query.page);

  if (query.letter) {
    data = await mainFetcher(
      encodeURI(`/people/initials/${query.letter}?page=${page}&size=12`)
    );
  } else if (query.role) {
    data = await mainFetcher(
      encodeURI(`/People/role/${query.role}?page=${page}&size=12`)
    );
  } else if (query.claimed) {
    data = await mainFetcher(
      `/people?showAvailableAccounts=${query.claimed}&page=${page}&size=12`
    );
  } else if (query.order) {
    data = await mainFetcher(
      `/people?alphabeticalOrder=${query.order}&page=${page}&size=12`
    );
  } else {
    data = await mainFetcher(`/people?page=${page}&size=12`);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  const artists = data.results;
  const pageCount = data.totalPages;

  return {
    props: {
      artists,
      pageCount,
      page,
    },
  };
};

const letters = [..."ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"];
const roles = [
  "Ηθοποιός",
  "Παίζουν",
  "Σκηνοθεσία",
  "Βοηθός σκηνοθέτη",
  "Φωτισμοί",
  "Φωτογραφίες",
  "Μουσική",
  "Παραγωγή",
  "Μετάφραση",
  "Σκηνικά",
  "Κοστούμια",
  "Ερμηνεύουν",
  "Κείμενο",
  "Ηθοποιοί",
  "Μουσική επιμέλεια",
  "Συγγραφέας",
  "Επικοινωνία",
  "Πρωταγωνιστούν",
  "Σχεδιασμός Φωτισμών",
  "Χορογραφίες",
  "Επιμέλεια Κίνησης",
  "Παίζουν οι ηθοποιοί",
  "Οργάνωση παραγωγής",
  "Σκηνικά-Κοστούμια",
  "Ερμηνεία",
];

const claimed = ["True", "False"];
const order = ["True", "False"];

const ArtistsPagination: React.FC<ArtistsPaginationProps> = ({
  artists,
  pageCount,
  page,
}) => {
  const router = useRouter();
  const [letterValue, setLetterValue] = useState(router.query.letter);
  const [roleValue, setRoleValue] = useState(router.query.role);
  const [claimedValue, setClaimedValue] = useState(router.query.claimed);
  const [orderValue, setOrderValue] = useState(router.query.order);
  const [drawer, setDrawer] = useState(false);

  const handleClear = () => {
    router.push({
      pathname: "/artists",
      query: {
        page: 1,
      },
    });
    setDrawer(false);
  };

  useEffect(() => {
    if (letterValue) {
      router.push({
        pathname: "/artists",
        query: {
          page: 1,
          letter: letterValue,
        },
      });
      setDrawer(false);
    }
  }, [letterValue, router]);

  useEffect(() => {
    if (roleValue) {
      router.push({
        pathname: "/artists",
        query: {
          page: 1,
          role: roleValue,
        },
      });
      setDrawer(false);
    }
  }, [roleValue, router]);

  useEffect(() => {
    if (claimedValue) {
      router.push({
        pathname: "/artists",
        query: {
          page: 1,
          claimed: claimedValue,
        },
      });
      setDrawer(false);
    }
  }, [claimedValue, router]);

  useEffect(() => {
    if (orderValue) {
      router.push({
        pathname: "/artists",
        query: {
          page: 1,
          order: orderValue,
        },
      });
      setDrawer(false);
    }
  }, [orderValue, router]);

  const Filters = (
    <div className="px-0 py-3 w-[300px] mt-12 -mr-14 flex flex-col items-start gap-5">
      <Typography variant="h3" style={{ marginBottom: 30 }}>
        Φίλτρα
      </Typography>
      <Autocomplete
        value={letterValue}
        onChange={(_event, newValue) => {
          if (newValue != null) setLetterValue(newValue);
        }}
        id="controllable-states-demo"
        options={letters}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Αρχικό Γράμμα"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        value={roleValue}
        onChange={(_event, newValue) => {
          if (newValue != null) setRoleValue(newValue);
        }}
        id="controllable-states-demo"
        options={roles}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Επάγγελμα"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        value={claimedValue}
        onChange={(_event, newValue) => {
          if (newValue != null) setClaimedValue(newValue);
        }}
        id="controllable-states-demo"
        options={claimed}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Unclaimed"
            variant="outlined"
          />
        )}
      />
      <Autocomplete
        value={orderValue}
        onChange={(_event, newValue) => {
          if (newValue != null) setOrderValue(newValue);
        }}
        id="controllable-states-demo"
        options={order}
        style={{ width: 200 }}
        renderInput={(params) => (
          <TextField
            color="secondary"
            {...params}
            label="Ordered"
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
        <title>Καλλιτέχνες | Theatrica</title>
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
          title="Καλλιτέχνες"
          items={artists}
          pageCount={pageCount}
          page={page}
          path="/artists"
        />
      </div>
    </>
  );
};

export default ArtistsPagination;
