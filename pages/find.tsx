import {
  Typography,
  TextField,
  Slider,
  Button,
  InputAdornment,
  Switch,
  FormControlLabel,
  Radio,
  ThemeProvider,
  useTheme,
  Autocomplete,
} from "@mui/material";
import { useReducer, useEffect, useState, useRef, Reducer } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Script from "next/script";
import { useRouter } from "next/router";
// import events from "../public/eventsVeryNew.json";
import { mainFetcher } from "../src/utils/AxiosInstances";
import EventsCard from "../src/components/EventsCard";
import { Pagination } from "@mui/material";
import Head from "next/head";
import DateFnsUtils from "@date-io/date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import grLocale from "date-fns/locale/el";
import { DatePickerTheme } from "../src/assets/themes/DarkTheme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Event } from "../src/types/entities/Event";
import { Venue } from "../src/types/entities/Venue";
import { Production } from "../src/types/entities/Production";

// loading of the Google Maps Autocomplete and set the Autocomplete service
let sessionToken: google.maps.places.AutocompleteSessionToken;
const date = new Date();

// loading of the Google Maps Autocomplete and set the Autocomplete service
function handleScriptLoad(
  setService: (service: google.maps.places.AutocompleteService) => void
) {
  sessionToken = new google.maps.places.AutocompleteSessionToken();
  const autocompleteService = new google.maps.places.AutocompleteService();
  setService(autocompleteService);
}
const initialFormData = {
  address: "",
  dateStart: date,
  dateEnd: null,
  maxDistance: 5,
};

const initialErrorData = {
  address: "",
  dateStart: "",
  dateEnd: "",
};

type State = {
  [key: string]: any;
};

type Action = {
  field: string;
  value: any;
};
const reducer: Reducer<State, Action> = (state, action) => {
  return {
    ...state,
    [action.field]: action.value,
  };
};

export const getServerSideProps = async ({ query }) => {
  let filteredEvents: Event[] = [];
  let filteredVenues: Venue[] = [];
  // initialize events
  const response = await mainFetcher(`/events`);
  const events = response.results as Event[];

  //initialize productions
  const apiProductions = await mainFetcher("/productions");
  const productionsResult = apiProductions.results as Production[];

  // initialize venues
  const apiVenues = await mainFetcher("/venues");
  const venuesResult = apiVenues.results as Venue[];

  if (query.dateStart) {
    const dateStart = new Date(query.dateStart);

    if (query.dateEnd) {
      const dateEnd = new Date(query.dateEnd);
      dateEnd.setUTCHours(23, 59, 59, 999);
      filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.dateEvent);
        if (eventDate > dateStart && eventDate < dateEnd) {
          return true;
        }
      });
    } else {
      filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.dateEvent);
        if (
          eventDate.getDate() === dateStart.getDate() &&
          eventDate.getMonth() === dateStart.getMonth() &&
          eventDate.getFullYear() === dateStart.getFullYear()
        ) {
          return true;
        }
      });
    }

    const venueIDs = [...new Set(filteredEvents.map((event) => event.venueId))];

    filteredVenues = venuesResult.filter((venue) =>
      venueIDs.includes(venue.id)
    );

    if (query.address && query.maxDistance) {
      const maxDistance = query.maxDistance * 1000;

      filteredVenues = await Promise.all(
        filteredVenues.map(async (venue) => {
          // FIXME: nice query bro
          if (venue.id === 81) {
            return venue;
          }
          const URI = encodeURI(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${query.address}&destinations=${venue.title}&region=gr&key=${process.env.DISTANCE_MATRIX_API}`
          );
          const response = await fetch(URI);
          const distance = await response.json();

          if (distance.rows[0]?.elements[0]?.distance?.value <= maxDistance) {
            return venue;
          }
        })
      );

      filteredVenues = filteredVenues.filter((venue) => venue);
      const filteredVenueIDs = filteredVenues.map((venue) => venue.id);

      filteredEvents = filteredEvents.filter((event) => {
        if (filteredVenueIDs.includes(Number(event.venueId))) {
          return true;
        }
      });
    }
  }

  const productionIDs = [
    ...new Set(filteredEvents.map((event) => event.productionId)),
  ];

  const productions = productionsResult.filter((production) =>
    productionIDs.includes(production.id)
  );

  const shows = productions.map((production) => {
    let eventsFinal = filteredEvents.filter(
      (event) => Number(event.productionId) === production?.id
    );
    eventsFinal = eventsFinal.map((event) => {
      const venue = filteredVenues.find(
        (venue) => Number(event.venueId) === venue?.id
      );
      return {
        date: event.dateEvent,
        venue,
        price: event.priceRange,
      };
    });
    return {
      id: production.id,
      title: production.title,
      duration: production.duration,
      events: eventsFinal,
      url: production.url,
    };
  });
  return {
    props: {
      shows,
    },
  };
};

const FindShow = ({ shows }) => {
  const theme = useTheme();
  const router = useRouter();

  const [autocompleteService, setAutocompleteService] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const [checked, setChecked] = useState(true);
  const [radioState, setRadioState] = useState("a");
  const [addressClicked, setAddressClicked] = useState(false);

  const [formData, dispatch] = useReducer(reducer, initialFormData);
  const [errorText, dispatchError] = useReducer(reducer, initialErrorData);

  const scrollRef = useRef(null);
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    dispatch({ field: event.target.id, value: event.target.value });
    dispatchError({ field: event.target.id, value: "" });
  };

  const handleDateChange = (field, date) => {
    dispatch({ field, value: date });
    dispatchError({ field, value: "" });
  };

  const handleSliderChange = (_event, newValue) => {
    dispatch({ field: "maxDistance", value: newValue });
  };

  const handlePlaceSelect = (_event, newValue) => {
    dispatch({ field: "address", value: newValue });
  };

  const handleRadioChange = (event) => {
    setRadioState(event.target.value);
  };

  const handlePagination = (_event, value) => {
    setPage(value);
    scrollRef.current.scrollIntoView();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = "";
    if (validateForm()) {
      query += `dateStart=${formData.dateStart.toISOString().split("T")[0]}`;
      if (radioState === "b") {
        query += `&dateEnd=${formData.dateEnd.toISOString().split("T")[0]}`;
      }
      if (checked) {
        query += `&address=${formData.address}&maxDistance=${formData.maxDistance}`;
      }
      router.push(`/find?${query}`);
      setPage(1);
    }
  };

  const validateForm = () => {
    let dataValid = true;
    if (!formData.dateStart) {
      dispatchError({ field: "dateStart", value: "Επιλέξτε Ημερομηνία!" });
      dataValid = false;
    }
    if (radioState === "b" && !formData.dateEnd) {
      dispatchError({ field: "dateEnd", value: "Επιλέξτε Ημερομηνία!" });
      dataValid = false;
    }
    if (checked && !formData.address) {
      dispatchError({
        field: "address",
        value: "Συμπληρώστε την διεύθυνσή σας!",
      });
      dataValid = false;
    }
    return dataValid;
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (autocompleteService && typeof sessionToken !== "undefined") {
        autocompleteService.getPlacePredictions(
          {
            input: formData.address,
            sessionToken: sessionToken,
            componentRestrictions: {
              country: "gr",
            },
          },
          (predictions, status) => {
            setPredictions(predictions);
          }
        );
      }
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [autocompleteService, formData.address]);

  return (
    <LocalizationProvider
      utils={DateFnsUtils}
      locale={grLocale}
      dateAdapter={AdapterDateFns}
    >
      <Head>
        <title>Εύρεση Παράστασης | Theatrica</title>
      </Head>
      {addressClicked && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_JAVASCRIPT_API}&libraries=places`}
          onLoad={() => handleScriptLoad(setAutocompleteService)}
        />
      )}
      <div className="pageWrapper">
        <div className="pageContent">
          <Typography
            variant="h3"
            component="h1"
            className="relative inline-block"
          >
            Βρες Μια Παράσταση
          </Typography>
          <form
            id="searchForm"
            onSubmit={handleSubmit}
            className="flex flex-col ml-10 mt-16 gap-16"
          >
            <div>
              <div className="mb-6">
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioState === "a"}
                      value="a"
                      onChange={handleRadioChange}
                    />
                  }
                  label="Συγκεκριμένη Ημερομηνία"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={radioState === "b"}
                      value="b"
                      onChange={handleRadioChange}
                    />
                  }
                  label="Εύρος Ημερομηνιών"
                />
              </div>
              {/* Στο ThemeProvider, καλείτε το DatePickerTheme με prop theme.palette.secondary.main. Η συνάρτηση DatePickerTheme αναμένει ένα αντικείμενο με main property, αλλά φαίνεται ότι εστελνε απευθείας το χρώμα. */}
              <ThemeProvider
                theme={() =>
                  DatePickerTheme({ main: theme.palette.secondary.main })
                }
              >
                <div className="flex gap-12 self-stretch flex-wrap">
                  <div>
                    {radioState === "b" && (
                      <label className="text-[1rem]" htmlFor="dateStart">
                        Από:
                      </label>
                    )}
                    <div className="mt-3">
                      <DatePicker
                        label={radioState === "a" ? "Ημερομηνία" : "Από:"}
                        value={formData.dateStart}
                        onChange={(date) =>
                          handleDateChange("dateStart", new Date(date))
                        }
                        // onError={errorText.dateStart ? true : false}
                        openTo="month"
                      />
                    </div>
                  </div>
                  {radioState === "b" && (
                    <div>
                      <label className="text-[1rem]" htmlFor="dateEnd">
                        Έως:
                      </label>
                      <div className="mt-3">
                        <DatePicker
                          id="dateEnd"
                          label="Έως:"
                          value={formData.dateEnd}
                          onChange={(date) =>
                            handleDateChange("dateEnd", new Date(date))
                          }
                          openTo="month"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </ThemeProvider>
            </div>
            <div className="flex flex-col items-start gap-6">
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={() => {
                      setChecked((prev) => !prev);
                    }}
                    color="secondary"
                  />
                }
                label="Περιορισμός Απόστασης"
                labelPlacement="end"
              />
              <Autocomplete
                freeSolo
                id="address"
                onChange={handlePlaceSelect}
                onFocus={() => setAddressClicked(true)}
                value={formData.address}
                fullWidth
                disabled={!checked}
                options={
                  predictions
                    ? predictions.map((place) => place.description)
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Διεύθυνση:"
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    error={checked && errorText.address ? true : false}
                    helperText={checked && errorText.address}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <div className="self-stretch">
                <Typography gutterBottom>
                  <b>Μέγιστη Απόσταση: </b> {formData.maxDistance} χιλιόμετρα
                </Typography>
                <Slider
                  id="maxDistance"
                  color="secondary"
                  valueLabelDisplay="auto"
                  min={1}
                  value={formData.maxDistance}
                  onChange={handleSliderChange}
                  className="w-[95%] max-w-[420px]"
                  disabled={!checked}
                  classes={{
                    valueLabel: "text-white",
                  }}
                />
              </div>
            </div>
            <Button
              ref={scrollRef}
              type="submit"
              variant="outlined"
              startIcon={<SearchIcon fontSize="large" />}
              className="px-3 py-5 rounded-xl"
            >
              Αναζήτηση
            </Button>
          </form>
          {router.query.dateStart && (
            <div className="ml-10 mt-16">
              <Typography
                variant="h3"
                component="h1"
                className="relative inline-block"
              >
                Αποτελέσματα
              </Typography>
              <div className="ml-10 mt-16 flex flex-col gap-4">
                {shows.length > 0 ? (
                  <>
                    {shows.slice((page - 1) * 5, page * 5).map((show) => (
                      <EventsCard key={show.id} show={show} />
                    ))}
                    {shows.length > 5 && (
                      <Pagination
                        count={Math.ceil(shows.length / 5)}
                        page={page}
                        color="secondary"
                        onChange={handlePagination}
                        className="flex !justify-center"
                      />
                    )}
                  </>
                ) : (
                  <Typography variant="body1">
                    Δεν βρέθηκαν παραστάσεις!
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default FindShow;
