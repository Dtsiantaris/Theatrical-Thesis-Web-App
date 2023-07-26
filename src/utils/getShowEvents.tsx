import { months } from "./constants";

interface Event {
  date: string;
  stringDate: string;
  time: string;
  year: number;
}

interface ShowEvent {
  pastEvents: Event[];
  upcomingEvents: Event[];
  eventsByMonth: { monthYear: string; numberOfShows: number }[];
  eventsByStartTime: { time: string; numberOfShows: number }[];
  range: string | null;
}

export default function getShowEvents(events: Event[]): ShowEvent {
  let pastEvents: Event[] = [];
  let upcomingEvents: Event[] = [];
  let range: string | null = null;

  if (events) {
    events.forEach((event: Event) => {
      const date = new Date(event.date);
      event.stringDate = date.toLocaleDateString("el", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      event.time = date.toLocaleTimeString("el", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      event.year = date.getFullYear();
      if (date > new Date()) {
        // Compare date objects instead of strings
        upcomingEvents.push(event);
      } else {
        pastEvents.push(event);
      }
    });
    pastEvents.sort((a, b) => {
      return b.date.localeCompare(a.date);
    });

    if (pastEvents.length > 0 && upcomingEvents.length < 1) {
      range = pastEvents[pastEvents.length - 1].year.toString();
    } else if (upcomingEvents.length > 0 && pastEvents.length < 1) {
      range = upcomingEvents[upcomingEvents.length - 1].year.toString();
    } else if (upcomingEvents.length > 0 && pastEvents.length > 0) {
      if (
        pastEvents[pastEvents.length - 1].year !==
        upcomingEvents[upcomingEvents.length - 1].year
      ) {
        range = `${pastEvents[pastEvents.length - 1].year} - ${
          upcomingEvents[upcomingEvents.length - 1].year
        }`;
      } else {
        range = pastEvents[pastEvents.length - 1].year.toString();
      }
    }
  }

  const eventsByMonth = events.reduce(
    (acc: { monthYear: string; numberOfShows: number }[], event: Event) => {
      const date = new Date(event.date);
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;
      const existingMonthYear = acc.find(
        (item) => item.monthYear === monthYear
      );
      if (existingMonthYear) {
        existingMonthYear.numberOfShows++;
      } else {
        acc.push({ monthYear, numberOfShows: 1 });
      }
      return acc;
    },
    []
  );

  const eventsByStartTime = events.reduce(
    (acc: { time: string; numberOfShows: number }[], event: Event) => {
      const time = event.time;
      const existingTime = acc.find((item) => item.time === time);
      if (existingTime) {
        existingTime.numberOfShows++;
      } else {
        acc.push({ time, numberOfShows: 1 });
      }
      return acc;
    },
    []
  );

  eventsByStartTime.sort((a, b) => {
    const timeA = a.time.split(":");
    const timeB = b.time.split(":");
    const hoursA = parseInt(timeA[0]);
    const hoursB = parseInt(timeB[0]);
    const minutesA = parseInt(timeA[1]);
    const minutesB = parseInt(timeB[1]);

    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    } else {
      return minutesA - minutesB;
    }
  });

  return {
    pastEvents,
    upcomingEvents,
    eventsByMonth,
    eventsByStartTime,
    range,
  };
}
