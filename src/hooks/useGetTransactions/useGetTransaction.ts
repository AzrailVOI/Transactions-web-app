import {useQuery} from "@tanstack/react-query";
import TransactionService, {Response} from "../../services/Transaction.service.ts";
import {IFilterParams} from "../../types/IFilterParams.interface.ts";
import {ITransaction} from "../../types/transactions.interface.ts";

export function useGetTransaction({status, limit, customer, category}:IFilterParams) {
    return useQuery({
        queryFn: () => TransactionService.getTransactions({status, category, customer, limit}),
        queryKey: ['transactions'],
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
        select: ({data}) => {
            const resp:ITransaction[] = data.map((item: Response) => {
                return {
                    id: item.id,
                    fraud: item.fraud === 1 ? 'fraud' : item.fraud === 0 ? 'access' : 'suspicious',
                    customer: item.customer,
                    age: item.age,
                    sex: item.gender,
                    zipcodeOriginal: item.zipcodeOri,
                    merchant: item.merchant,
                    zipMerchant: item.zipMerchant,
                    category: item.category,
                    amount: item.amount
                }

            })
            return resp
        }
    })
}
