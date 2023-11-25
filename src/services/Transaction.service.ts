import axios from "axios";
import {IFilterParams} from "../types/IFilterParams.interface.ts";
export interface Response {
  id: number;
  step: number;
  customer: string;
  age: string;
  gender: 'M' | 'F' | 'E' | 'U';
  zipcodeOri: string;
  merchant: string;
  zipMerchant: string;
  category_id: number;
  amount: number;
  fraud: number;
  id1: number;
  category: string;
}
class TransactionService {
    private SERVER_URL = 'http://26.196.35.194:5000/api'
    async getTransactions({status, category, customer, limit}:IFilterParams) {
        if (status==='') status = 'all'
        if (category==='') category = 'all'
        if (customer==='') customer = 'all'
        if (limit===0) limit = 100
        return axios.get<Response[]>(`${this.SERVER_URL}/MySQL`,
            {
                params:{
                    statusFilter:status,
                    categoryFilter:category,
                    customerFilter:customer,
                    limit:limit
                }
            })
    }
}
export default new TransactionService()
