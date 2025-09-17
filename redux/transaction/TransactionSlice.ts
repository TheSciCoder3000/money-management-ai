import { createSlice } from "@reduxjs/toolkit";
import {
  addTransactons,
  fetchTransactons,
  updateTransaction,
} from "./TransactionThunk";

interface TransactionSlice {
  transactions: ITransactionDb[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  transactions: [],
  loading: "idle",
} satisfies TransactionSlice as TransactionSlice;

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactons.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchTransactons.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchTransactons.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.transactions = action.payload;
    });

    builder.addCase(addTransactons.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addTransactons.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addTransactons.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.transactions = [action.payload, ...state.transactions];
    });

    builder.addCase(updateTransaction.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateTransaction.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(updateTransaction.fulfilled, (state, action) => {
      const updatedTransaction = action.payload;
      state.loading = "succeeded";
      state.transactions = state.transactions.map((trans) => {
        if (trans.id === updatedTransaction.id) return updatedTransaction;
        return trans;
      });
    });
  },
});

export default transactionSlice.reducer;
