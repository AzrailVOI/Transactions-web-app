import {fraud} from "./fraud.type.ts";

export interface ITransaction {
    fraud: fraud,
    customer: string
    age: number
    sex: 'M' | 'F' | 'E' | 'U'
    zipcodeOriginal: number
    merchant: string
    zipMerchant: number
    category: string
    amount: number
}
