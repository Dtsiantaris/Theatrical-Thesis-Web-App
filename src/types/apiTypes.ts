export interface Contribution {
  id: number;
  peopleId: number;
  productionId: number;
  roleId: number;
  systemId: number;
  timestamp: Date;
}

export interface Event {
  dateEvent: Date;
  priceRange: string;
  productionId: number;
  venueId: number;
}

export interface Organizer {
  id: number;
  name: string;
  address: string;
  town: string;
  postcode: string;
  phone: string;
  email: string;
  doy: string;
  afm: string;
  systemId: number;
  timestamp: Date;
}

export interface Person {
  id: number;
  fullname: string;
  systemId: number;
}

export interface Production {
  id: number;
  organizerId: number;
  title: string;
  description: string;
  url: string;
  producer: string;
  mediaUrl: string;
  duration: string;
}

export interface Role {
  id: number;
  role: string;
  systemId: number;
  timestamp: Date;
}

//TODO: transactions
//TODO: user

export interface Venue {
  id: number;
  title: string;
  address: string;
  systemId: number;
}
