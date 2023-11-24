import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITransaction} from "../../types/transactions.interface.ts";

const initialState:ITransaction[] = [
    {
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
        // @ts-ignore
        setTransaction: (state, action: PayloadAction<ITransactions>) => {
            state = [...state, action.payload]
        }
    }
})

export const { setTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer
