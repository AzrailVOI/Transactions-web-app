import styles from "../global/transactions/Transactions.module.scss";
import styles2 from "./transactionTable.module.scss"
import {ArrowDown01, ArrowDownAZ, ArrowUp10, ArrowUpZA, Filter} from "lucide-react";
import Transaction from "../transaction/Transaction.tsx";
import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector/useTypedSelector.ts";
import {ITransaction} from "../../types/transactions.interface.ts";
import {fraud} from "../../types/fraud.type.ts";
import {useDispatch} from "react-redux";
import {newTransactions, sortTransaction} from "../../redux/transactions/transactions.slice.ts";
import {useGetTransaction} from "../../hooks/useGetTransactions/useGetTransaction.ts";
import {setFilterCategory, setFilterCustomer} from "../../redux/filterParams/filterParams.slice.ts";
import Loader from "../Loader/Loader.tsx";

interface ITransactionTable {
    filterFraud: fraud[],
    limit: number
}
interface ISearch {
  column: keyof ITransaction;
  value: string;
  check?: boolean;
}

interface IIsSorted {
  column: keyof ITransaction;
  order: 'asc' | 'desc';
}

interface ITitles {
    column: keyof ITransaction
    title: string
}
const titles:Array<ITitles> = [
    {
        column: 'id',
        title: 'ID',
    },
      {
          column: 'customer',
          title: 'Клиент',
      },
      {
          column: 'age',
          title: 'Возраст',
      },
      {
          column: 'sex',
          title: 'Пол',
      },
      {
          column: 'category',
          title: 'Категория',
      },
      {
          column: 'amount',
          title: 'Сумма',
      },
      {
          column: 'zipcodeOriginal',
          title: 'Индекс покупателя',
      },
      {
          column: 'merchant',
          title: 'ID продавца',
      },
      {
          column: 'zipMerchant',
          title: 'Индекс продавца',
      },
        {
            column: 'sus',
            title: 'Хмм...',
        }
  ]


export default function TransactionTable({filterFraud}: ITransactionTable){

    const transactions = useTypedSelector((state) => state.transactions);
    const dispatch = useDispatch()
    const [search, setSearch] = useState<ISearch[]>([]);
    const [searched, setSearched] = useState<ITitles[]>([]);
    const [isSortingColumn, setIsSortingColumn] = useState<IIsSorted>({ column: 'id', order: 'asc' });

    const filterParams = useTypedSelector((state) => state.filterParams)
    const {data: transactionsDB, isLoading} = useGetTransaction({
        status: filterParams.status,
        limit: filterParams.limit,
        customer: filterParams.customer,
        category: filterParams.category,
        offset: filterParams.offset
    })
    useEffect(() => {
        console.log("TDB",transactionsDB)
        if (transactionsDB)
         dispatch(newTransactions(transactionsDB))
    }, [transactionsDB])
    function searchColumn({ column, value }: ISearch) {
        setSearch((prevSearch) => {
            const existingSearchIndex = prevSearch.findIndex((item) => item.column === column);

            if (existingSearchIndex !== -1) {
                // Если колонка уже в поиске, обновите значение
                const updatedSearch = [...prevSearch];
                updatedSearch[existingSearchIndex] = { column, value };
                return updatedSearch;
            } else {
                // В противном случае, добавьте новую колонку для поиска
                return [...prevSearch, { column, value }];
            }
        });
        if (column === "category" || column === "customer") {
            if (column === "category"){
                dispatch(setFilterCategory(value))
            }
            if (column === "customer"){
                dispatch(setFilterCustomer(value))
            }

        }
    }
    function sortedByColumn(column: keyof ITransaction) {
        setIsSortingColumn({ column, order: isSortingColumn.order === 'asc' ? 'desc' : 'asc' });

        const sorted = [...transactions].sort((a, b) => {
            if (a[column] > b[column]) {
                return 1;
            }
            if (a[column] < b[column]) {
                return -1;
            }
            return 0;
        })
        if (isSortingColumn.order === 'desc') {
            sorted.reverse();
        }
        dispatch(sortTransaction(sorted))
        console.log(sorted)
        return sorted;
    }
    function searchedElement({ column, title }: ITitles) {
        const isIndexPresent = searched.some((item) => item.column === column);


        if (isIndexPresent) {
            const updatedSearched = searched.filter((item) => item.column !== column);
            setSearched(updatedSearched);
            console.log(updatedSearched);
        } else {
            console.log([...searched, { column, title }]);
            setSearched([...searched, { column, title }]);
        }
    }
    return (
        <>
            {/*<h1>*/}
            {/*    <button*/}
            {/*        onClick={()=>{}}*/}
            {/*    >*/}
            {/*        TEST*/}
            {/*    </button>*/}
            {/*</h1>*/}
            <div className={styles.transactions_table_title}>
                {titles.map((title, index) => (
                    <div key={index}>
                        {isSortingColumn.column === title.column ?
                             isSortingColumn.order === 'asc' ?
                            title.column === "id" || title.column === "age" || title.column === "amount" || title.column === "zipcodeOriginal" || title.column === "zipMerchant" ?
                                <ArrowUp10 onClick={() => sortedByColumn(title.column)}/>
                                : <ArrowUpZA onClick={() => sortedByColumn(title.column)} />
                            : isSortingColumn.order === 'desc' &&
                                 title.column === "id" || title.column === "age" || title.column === "amount" || title.column === "zipcodeOriginal" || title.column === "zipMerchant" ?
                                     <ArrowDown01 onClick={() => sortedByColumn(title.column)}/>
                                     : <ArrowDownAZ onClick={() => sortedByColumn(title.column)} />
                            : <div className={styles2.none}>
                                {isSortingColumn.order === 'asc' ?
                                    title.column === "id" || title.column === "age" || title.column === "amount" || title.column === "zipcodeOriginal" || title.column === "zipMerchant" ?
                                        <ArrowUp10 onClick={() => sortedByColumn(title.column)}/>
                                        : <ArrowUpZA onClick={() => sortedByColumn(title.column)}/>
                                    : isSortingColumn.order === 'desc' &&
                                    title.column === "id" || title.column === "age" || title.column === "amount" || title.column === "zipcodeOriginal" || title.column === "zipMerchant" ?
                                        <ArrowDown01 onClick={() => sortedByColumn(title.column)}/>
                                        : <ArrowDownAZ onClick={() => sortedByColumn(title.column)}/>}
                            </div>
                        }
                        <div
                            onClick={() => sortedByColumn(title.column)}
                        >
                            {title.title}
                        </div>
                        <div>
                            <Filter
                                onClick={() => searchedElement(title)}
                                className={search.some((item) => item.column === title.column && item.value !== '') || searched.some((item) => item.column === title.column) ? styles2.filtered : styles2.filter}
                            />
                        </div>


                        {searched.map((item) => {
                            if (item.column === title.column) {
                                return (
                                    <span key={index}>
                                        <input
                                            type="text"
                                            value={(search.find((searchItem) => searchItem.column === title.column)?.value) || ''}
                                            onChange={(e) => searchColumn({ column: title.column, value: e.target.value })}
                                        />
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}
            </div>
            <div className={styles.transactions_table}>
                {!isLoading?
                    transactions.map((transaction, index) => {
                    if (filterFraud.includes(transaction.fraud)) {
                        if (
                            search.every((searchItem) => {
                                const columnValue = transaction[searchItem.column];
                                return String(columnValue).includes(searchItem.value);
                            })
                        ) {
                            return (
                                <>
                                    <Transaction
                                        key={index}
                                        id={transaction.id}
                                        fraud={transaction.fraud}
                                        customer={transaction.customer}
                                        age={transaction.age}
                                        sex={transaction.sex}
                                        zipcodeOriginal={transaction.zipcodeOriginal}
                                        merchant={transaction.merchant}
                                        zipMerchant={transaction.zipMerchant}
                                        category={transaction.category}
                                        amount={transaction.amount}
                                        sus={transaction.sus}
                                    />
                                </>

                            );
                        }
                    }
                    return null;
                    })
                : <Loader/>
                }
            </div>
        </>
    )
}
