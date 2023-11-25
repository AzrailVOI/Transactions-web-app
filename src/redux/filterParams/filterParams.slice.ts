import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFilterParams} from "../../types/IFilterParams.interface.ts";

const initialState:IFilterParams= {
    status: '',
    customer: '',
    category: '',
    limit: 100
}

// @ts-ignore
export const filterParamsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        setFilterStatus: (state,action:PayloadAction<string>) => {
            state.status = action.payload
        },
        setFilterCustomer: (state,action:PayloadAction<string>) => {
            state.customer = action.payload
        },
        setFilterCategory: (state,action:PayloadAction<string>) => {
            state.category = action.payload
        },
        setFilterLimit: (state,action:PayloadAction<number>) => {
            state.limit = action.payload
        }
    }
})

export const { setFilterStatus, setFilterCustomer, setFilterCategory, setFilterLimit } = filterParamsSlice.actions

export default filterParamsSlice.reducer
