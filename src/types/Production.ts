import { Contribution } from "./Contribution";
import { Event } from "./Event";
import { Organizer } from "./Organizer";

export interface Production {
  id: number;
  systemId: number;
  organizerId: number;
  title: string;
  description: string;
  url: string;
  producer: string;
  mediaUrl: string;
  duration: string;
  timeStamp: Date;
  organizer: Organizer;
  contributions: Contribution[];
  events: Event[];
}
