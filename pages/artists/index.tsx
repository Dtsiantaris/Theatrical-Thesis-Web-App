import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import Head from "next/head";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Hidden, Drawer, Fab, Button } from "@material-ui/core";
import style from "../../src/assets/jss/layouts/artistsPageStyle";
import FilterListIcon from "@material-ui/icons/FilterList";
import { GetServerSideProps } from "next";
import { Person } from "../../src/types/Person";
import { ArtistCardProps } from "../../src/components/ArtistCard";

interface ArtistsPaginationProps {
  artists: Person[];
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

const useStyles = makeStyles(style);

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
  const classes = useStyles();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterValue]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleValue]);

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
  }, [claimedValue]);

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
  }, [orderValue]);

  const Filters = (
    <div className={classes.filtersContainer}>
      <Typography variant="h3" style={{ marginBottom: 30 }}>
        Φίλτρα
      </Typography>
      <Autocomplete
        value={letterValue}
        onChange={(event, newValue) => {
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
        onChange={(event, newValue) => {
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
        onChange={(event, newValue) => {
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
        onChange={(event, newValue) => {
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
      </Hidden>
      <div className={classes.artistsContainer}>
        <Hidden smDown>{Filters}</Hidden>
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
