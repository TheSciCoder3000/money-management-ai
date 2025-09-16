import { createSlice } from "@reduxjs/toolkit";
import { addAccount, fetchAccounts } from "./AccountThunk";

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
  },
});

export default accountSlice.reducer;
