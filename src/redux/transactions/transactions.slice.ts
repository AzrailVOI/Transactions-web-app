import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITransaction} from "../../types/transactions.interface.ts";

const initialState:ITransaction[] = [
    {
        id: 1,
        fraud: "access",
        customer: "C1093826158",
        age: 2,
        sex: "F",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 2,
        fraud: "fraud",
        customer: "C1093826158",
        age: 2,
        sex: "M",
        zipcodeOriginal: 28007,
        merchant: "M3489415",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 3,
        fraud: "suspicious",
        customer: "C1093826158",
        age: 2,
        sex: "F",
        zipcodeOriginal: 28007,
        merchant: "M348934789",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 4,
        fraud: "fraud",
        customer: "C1093826152",
        age: 0,
        sex: "M",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 5,
        fraud: "access",
        customer: "C1093826152",
        age: 0,
        sex: "M",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 6,
        fraud: "suspicious",
        customer: "C1093826153",
        age: 4,
        sex: "F",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 7,
        fraud: "fraud",
        customer: "C1093826154",
        age: 3,
        sex: "M",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    },
    {
        id: 8,
        fraud: "suspicious",
        customer: "C1093826151",
        age: 6,
        sex: "F",
        zipcodeOriginal: 28007,
        merchant: "M348934600",
        zipMerchant: 28007,
        category: "es_transportation",
        amount: 4.55
    }
]

// @ts-ignore
export const transactionsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        setTransaction: (state, action: PayloadAction<ITransaction>) => {
            state.push(action.payload);
        },
        sortTransaction: (state,action:PayloadAction<ITransaction[]>) => {
            state.length = 0; // Очистить существующий массив
            state.push(...action.payload); // Добавить новые элементы
        }
    }
})

export const { setTransaction, sortTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer
