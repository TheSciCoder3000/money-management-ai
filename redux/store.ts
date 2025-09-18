import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/AccountSlice";
import transactionReducer from "./transaction/TransactionSlice";
import categoryReducer from "./category/CategorySlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    transaction: transactionReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
