import { Production } from "./Production";

export interface Event {
  id: number;
  productionId: number;
  venueId: number;
  dateEvent: Date;
  priceRange: string;
  systemId: number;
  timestamp: Date;
  isClaimed: boolean;
  production: Production;
}
