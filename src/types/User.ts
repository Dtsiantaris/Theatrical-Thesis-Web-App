import { Transaction } from "./Transaction";

export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  role: string;
  transactions?: Transaction[];
  balance: number;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}
