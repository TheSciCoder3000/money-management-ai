type AccountType = {
  id: string;
  name: string;
};

type TableDataSchema = {
  id: string;
  account: AccountType;
  paymentMethod: "Cash" | "Bank Transfer";
  note: string;
  amount: number;
  type: TransactionType;
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
  income: number;
  expenses: number;
}

interface ITransactionDb {
  id: string;
  created_at: string;
  account_id: string;
  user_id: string;
  value: number;
  category_id: string;
  type: TransactionType;
  note: string;
}

type TransactionType = "income" | "expenses" | "transfer";

interface ICategoryDb {
  id: string;
  created_at: string;
  name: string;
  user_id: string;
  budget: number | null;
  total: number;
  color: string;
}
