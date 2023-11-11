import { Transaction } from "./Transaction";

export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  _2FA_enabled: boolean;
  role: string;
  transactions?: Transaction[];
  balance: number;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}
