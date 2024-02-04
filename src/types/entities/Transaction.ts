export interface Transaction {
  userId: number;
  creditAmount: number;
  reason: string;
  dataCreated: Date;
  transactionId: string;
  accountNumber: string;
  accountType: string;
}
