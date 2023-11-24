import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
}

// @ts-ignore
export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        // @ts-ignore
        setTickets: (state, action: PayloadAction<StateTickets>) => {
        }
    }
})

export const { setTickets } = ticketsSlice.actions

export default ticketsSlice.reducer
