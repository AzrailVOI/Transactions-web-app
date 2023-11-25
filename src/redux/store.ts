import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ticketsSlice from "./tickets/tickets.slice.ts";
import transactionsSlice from "./transactions/transactions.slice.ts";
import filterParamsSlice from "./filterParams/filterParams.slice.ts";

const reducers = combineReducers({
    tickets: ticketsSlice,
    transactions: transactionsSlice,
    filterParams: filterParamsSlice
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
