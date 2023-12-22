import { mainFetcher } from "../../utils/AxiosInstances";
// interfaces
import { GoogleGeocodingResult } from "../../types/GoogleGeoResult";
import { Production } from "../../types/Production";
import { Venue } from "../../types/Venue";

export const fetchVenueById = async (id: number): Promise<Venue | null> => {
  try {
    return (await mainFetcher(`Venues/${id}`)) as Venue;
  } catch (error) {
    console.log("Error in fetch venue by id", error);
    return null;
  }
};

export const fetchVenueProductionsById = async (
  id: number
): Promise<Production[] | null> => {
  try {
    return (await mainFetcher(`Venues/${id}/productions`))
      .results as Production[];
  } catch (error) {
    console.log("Error in fetch venue productions by id", error);
    return null;
  }
};

export const fetchVenueLocation = async (
  venueTitle: string
): Promise<GoogleGeocodingResult | null> => {
  try {
    const URI = encodeURI(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${venueTitle}&region=gr&key=${process.env.GEOCODING_API}&language=el`
    );

    const res = await fetch(URI);
    let location = await res.json();

    location = location.results[0] || null;
    return location as GoogleGeocodingResult;
  } catch (error) {
    console.log("Error in google geo API by venue title", error);
    return null;
  }
};
