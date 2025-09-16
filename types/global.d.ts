type Account = {
  id: string;
  name: string;
};

type TableDataSchema = {
  invoice: string;
  account: Account;
  amount: number;
  paymentMethod: "Cash" | "Bank Transfer";
  note?: string;
};

interface AITransactionResponse {
  amount: number;
  note: string;
  account: string;
}

interface IAccountDb {
  id: string;
  created_at: string;
  type: string;
  name: string;
  user_id: string;
  balance: number;
  income: number;
  expenses: number;
}
