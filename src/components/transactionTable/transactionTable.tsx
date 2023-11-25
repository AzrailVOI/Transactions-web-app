import styles from "../global/transactions/Transactions.module.scss";
import {ArrowBigDown, ArrowBigUp, Search} from "lucide-react";
import Transaction from "../transaction/Transaction.tsx";
import {useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector/useTypedSelector.ts";
import {ITransaction} from "../../types/transactions.interface.ts";
import {fraud} from "../../types/fraud.type.ts";
import {useDispatch} from "react-redux";
import {sortTransaction} from "../../redux/transactions/transactions.slice.ts";

interface ITransactionTable {
    filterFraud: fraud[],
    limit: number
}
interface ISearch {
  column: keyof ITransaction;
  value: string;
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
          title: 'Категория покупки',
      },
      {
          column: 'amount',
          title: 'Сумма покупки',
      },
      {
          column: 'zipcodeOriginal',
          title: 'Почтовый индекс источника',
      },
      {
          column: 'merchant',
          title: 'ID продавца',
      },
      {
          column: 'zipMerchant',
          title: 'Почтовый индекс продавца',
      }
  ]


export default function TransactionTable({filterFraud, limit}: ITransactionTable){

    const transactions = useTypedSelector((state) => state.transactions);
    const dispatch = useDispatch()
    const [search, setSearch] = useState<ISearch[]>([]);
    const [searched, setSearched] = useState<ITitles[]>([]);
    const [isSortingColumn, setIsSortingColumn] = useState<IIsSorted>({ column: 'id', order: 'desc' });

    // const [data:transactionsDB, error, isLoading] = useGetTransaction()

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
            <div className={styles.transactions_table_title}>
                {titles.map((title, index) => (
                    <div key={index}>
                        {isSortingColumn.column === title.column ?
                             isSortingColumn.order === 'asc' ?
                            <ArrowBigUp onClick={() => sortedByColumn(title.column)} />
                            : isSortingColumn.order === 'desc' &&
                            <ArrowBigDown onClick={() => sortedByColumn(title.column)} />
                            : null
                        }
                        <div
                            onClick={() => sortedByColumn(title.column)}
                        >
                            {title.title}
                        </div>
                        <div>
                            <Search onClick={() => searchedElement(title)} />
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
                {transactions.map((transaction, index) => {
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
                                    />
                                </>

                            );
                        }
                    }
                    return null;
                })}
            </div>
        </>
    )
}