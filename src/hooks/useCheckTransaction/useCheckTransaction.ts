import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ICheckTransaction} from "../../types/ICheckTransaction.ts";
import TransactionService from "../../services/Transaction.service.ts";
import {useTypedSelector} from "../useTypedSelector/useTypedSelector.ts";

export const useCheckTransaction = ()=>{
    const queryClient = useQueryClient()
    const filterParams = useTypedSelector((state) => state.filterParams)
    return useMutation({
        mutationFn: ({id, check}:ICheckTransaction)=>TransactionService.checkTransaction({id, check}),
        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ['transactions', filterParams.status, filterParams.limit, filterParams.customer, filterParams.category, filterParams.offset],
                exact: true,
                stale: true,
            })
        }
    })
}
