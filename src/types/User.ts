import { Transaction } from "./Transaction";

export interface User {
  id: number;
  email: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  role: string;
  transactions?: Transaction[];
  balance: number;
}
