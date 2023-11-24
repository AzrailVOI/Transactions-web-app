import styles from './Transactions.module.scss';
import Transaction from '../../transaction/Transaction.tsx';
import { useTypedSelector } from '../../../hooks/useTypedSelector/useTypedSelector.ts';
import { Checkbox } from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { fraud } from '../../../types/fraud.type.ts';
import { Search } from 'lucide-react';
import {ITransaction} from "../../../types/transactions.interface.ts";

interface ISearch {
  column: keyof ITransaction;
  value: string;
}

interface ITitles {
    column: keyof ITransaction
    title: string
}

interface ITransactions {}

export default function Transactions({}: ITransactions) {
  const transactions = useTypedSelector((state) => state.transactions);
  const [filterFraud, setFilterFraud] = useState<fraud[]>(['access', 'fraud', 'suspicious']);
  const titles:Array<ITitles> = [
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

  const [search, setSearch] = useState<ISearch[]>([]);
  const [searched, setSearched] = useState<ITitles[]>([]);

  function filterToggle(fraud: fraud) {
    const updatedFilterFraud = filterFraud.includes(fraud)
      ? filterFraud.filter((item) => item !== fraud)
      : [...filterFraud, fraud];

    console.log(updatedFilterFraud);
    setFilterFraud(updatedFilterFraud);
  }

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
    <div className={styles.transactions}>
      <div className={'title ' + styles.transactions_title}>
        <div>Транзакции</div>
        <div className={styles.transactions_checkboxes}>
          <Checkbox defaultChecked color="success" onClick={() => filterToggle('access')} />
          <Checkbox defaultChecked color="warning" onClick={() => filterToggle('suspicious')} />
          <Checkbox
            defaultChecked
            sx={{
              color: red[800],
              '&.Mui-checked': {
                color: red[600],
              },
            }}
            onClick={() => filterToggle('fraud')}
          />
        </div>
      </div>
      <div className={styles.transactions_table_title}>
        {titles.map((title, index) => (
          <div key={index}>
            <div>{title.title}</div>
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
                <Transaction
                  key={index}
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
              );
            }
          }
          return null;
        })}
      </div>
    </div>
  );
}
