import { Transaction } from "./Transaction";

export interface UserPhoto {
  id: number;
  imageLocation: string;
  label: string;
}

export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  _2FA_enabled: boolean;
  role: string;
  performerRoles: string[];
  transactions?: Transaction[];
  balance: number;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  profilePhoto?: UserPhoto;
  bioPdfLocation?: string;
  userImages: UserPhoto[];
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
}
