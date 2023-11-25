import {fraud} from "./fraud.type.ts";

export interface ITransaction {
    id: number
    fraud: fraud,
    customer: string
    age: string
    sex: 'M' | 'F' | 'E' | 'U'
    zipcodeOriginal: string
    merchant: string
    zipMerchant: string
    category: string
    amount: number
}
