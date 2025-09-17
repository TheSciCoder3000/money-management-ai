import { createSlice } from "@reduxjs/toolkit";
import { addAccount, deleteAccount, fetchAccounts } from "./AccountThunk";

interface AccountState {
  accounts: IAccountDb[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  accounts: [],
  loading: "idle",
} satisfies AccountState as AccountState;

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAccounts.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accounts = action.payload;
    });

    builder.addCase(addAccount.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addAccount.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(addAccount.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accounts.push(action.payload);
    });

    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteAccount.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accounts = state.accounts.filter(
        (acc) => acc.id !== action.payload.id,
      );
    });
  },
});

export default accountSlice.reducer;
