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
