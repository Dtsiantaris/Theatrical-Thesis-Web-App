export interface Transaction {
  userId: number;
  creditAmount: number;
  reason: string;
  dateCreated: Date;
  transactionId: string;
  accountNumber: string;
  accountType: string;
}
