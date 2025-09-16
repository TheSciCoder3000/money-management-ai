"use client";

import React, { ReactNode, useEffect } from "react";
import { store, useAppDispatch } from "@/redux/store";
import { Provider } from "react-redux";
import { fetchAccounts } from "./account/AccountThunk";
import { fetchTransactons } from "./transaction/TransactionThunk";

interface StoreProviderProps {
  children: ReactNode | ReactNode[];
}
const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <InitialRender>{children}</InitialRender>
    </Provider>
  );
};

interface InitialRenderProps {
  children?: ReactNode | ReactNode[];
}
export const InitialRender: React.FC<InitialRenderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchTransactons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default StoreProvider;
