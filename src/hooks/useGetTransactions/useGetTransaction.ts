import {useQuery} from "@tanstack/react-query";
import TransactionService, {Response} from "../../services/Transaction.service.ts";
import {IFilterParams} from "../../types/IFilterParams.interface.ts";
import {ITransaction} from "../../types/transactions.interface.ts";
// import {useTypedSelector} from "../useTypedSelector/useTypedSelector.ts";

export function useGetTransaction({status, limit, customer, category}:IFilterParams) {
    // const filterParams = useTypedSelector((state) => state.filterParams)
    return useQuery({
        queryFn: () => TransactionService.getTransactions({status, category, customer, limit}),
        queryKey: ['transactions', status, limit, customer, category],
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        select: ({data}) => {
            const resp:ITransaction[] = data.map((item: Response) => {
                console.log('item', item)
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
