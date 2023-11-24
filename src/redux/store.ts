import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {ticketsSlice} from "./tickets/tickets.slice.ts";

const reducers = combineReducers({
    tickets: ticketsSlice.reducer
})
export const store = configureStore({
    reducer: reducers,
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
