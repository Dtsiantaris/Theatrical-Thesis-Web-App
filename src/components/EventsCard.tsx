import { Typography, Button, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import ScheduleIcon from "@mui/icons-material/Schedule";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NearMeIcon from "@mui/icons-material/NearMe";
import EventIcon from "@mui/icons-material/Event";
interface Show {
  id: string;
  title: string;
  duration: string;
  url: string;
  events: Event[];
}

interface Event {
  date: string;
  venue: Venue;
  price: string;
}

interface Venue {
  id: string;
  title: string;
  address: string;
}

interface EventsCardProps {
  show: Show;
}

const EventsCard: React.FC<EventsCardProps> = ({ show }) => {
  return (
    <Link href={`/shows/${show.id}`}>
      <div className="flex flex-col bg-gray-400 px-0 py-1 border border-transparent rounded-md hover:scale-105 hover:border-secondary transition-transform">
        <div className="flex justify-between items-center px-4 py-3">
          <Typography variant="h5" className="!font-medium">
            {show.title}
          </Typography>
        </div>
        {show.events.map((event, index) => {
          const eventDate = new Date(event.date);
          return (
            <div
              key={index}
              className="flex justify-between items-center px-5 py-3 gap-2"
            >
              <div className="flex flex-col gap-2">
                <div className="flex no-wrap gap-1">
                  <EventIcon />
                  <Typography variant="body1">
                    {eventDate.toLocaleDateString("el", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography variant="body1">
                    {eventDate.toLocaleTimeString("el", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    })}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <ScheduleIcon />
                  <Typography variant="body1">
                    {show.duration === "Not found" ? "N/A" : "N/A"}
                  </Typography>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/venues/${event.venue.id}`}>
                  <div className="rounded-md p-2 border border-transparent  hover:border-gray-600 hover:bg-gray-500 transition-all">
                    <Typography variant="body1" className="!font-medium">
                      {event.venue.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="flex items-center italic"
                    >
                      <LocationOnIcon style={{ fontSize: 16 }} />
                      {event.venue.address}
                      <Tooltip
                        slotProps={{
                          tooltip: {
                            className: "!bg-secondary",
                          },
                          arrow: {
                            className: "!text-secondary",
                          },
                        }}
                        arrow
                        placement="top"
                        title="Άνοιγμα στο google maps."
                      >
                        <IconButton
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${event.venue.title} ${event.venue.address}`
                          )}`}
                          target="_blank"
                          className="!ml-2 !bg-secondary !rounded-md !p-1.5 hover:bg-opacity-80 hover:scale-105 transition-transform hover:shadow-sm"
                          onClick={(event) => {
                            event.stopPropagation(); // Stop the event propagation
                          }}
                        >
                          <NearMeIcon style={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </div>
                </Link>

                <div className="flex justify-center items-center p-2 gap-2">
                  <ConfirmationNumberIcon />
                  <Typography variant="body1">
                    Εισιτήρια από {event.price}
                  </Typography>
                  <Tooltip
                    slotProps={{
                      tooltip: {
                        className: "!bg-secondary",
                      },
                      arrow: {
                        className: "!text-secondary",
                      },
                    }}
                    arrow
                    title="Μετάβαση στο viva.gr"
                  >
                    <IconButton
                      href={show.url}
                      target="_blank"
                      className="!bg-secondary !rounded-md !p-1.5 hover:bg-opacity-80 hover:scale-105 transition-transform hover:shadow-sm"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <OpenInNewIcon style={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
};

export default EventsCard;
