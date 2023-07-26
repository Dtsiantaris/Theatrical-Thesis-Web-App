// eventsByDate.tsx

import { mainFetcher } from "../../src/utils/AxiosInstances";
import events from "../../public/eventsVeryNew.json";
import isSameDay from "date-fns/isSameDay";
import { NextApiRequest, NextApiResponse } from "next";

interface Event {
  ID: number;
  ProductionID: number;
  VenueID: number;
  DateEvent: string;
  PriceRange: string;
  SystemID: number;
  timestamp: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { date } = req.body;

  const filteredEvents = events.filter((event: Event) => {
    // Explicitly define the type as 'Event'
    const eventDate = new Date(event.DateEvent);
    if (isSameDay(date, eventDate)) {
      return true;
    }
  });

  const showsByVenueMap = new Map();

  filteredEvents.forEach((event: Event) => {
    // Explicitly define the type as 'Event'
    if (!showsByVenueMap.has(event.VenueID)) {
      showsByVenueMap.set(event.VenueID, [event.ProductionID]);
    } else {
      if (!showsByVenueMap.get(event.VenueID).includes(event.ProductionID)) {
        showsByVenueMap.get(event.VenueID).push(event.ProductionID);
      }
    }
  });

  let showsByVenue = Array.from(showsByVenueMap, (venue) => {
    return {
      id: venue[0],
      shows: venue[1],
    };
  });

  showsByVenue = await Promise.all(
    showsByVenue.map(async (venue) => {
      const theater = await mainFetcher(`/venues/${venue.id}`);
      venue.shows = await Promise.all(
        venue.shows.map(async (show: number) => {
          // Explicitly define the type as 'number'
          const production = await mainFetcher(`/productions/${show}`);
          return {
            id: show,
            name: production.title,
          };
        })
      );

      return {
        ...venue,
        name: theater.title,
      };
    })
  );

  res.status(200).json(showsByVenue);
};

export default handler;
