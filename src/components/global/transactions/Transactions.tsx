import styles from './Transactions.module.scss';
import {Checkbox, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { fraud } from '../../../types/fraud.type.ts';
import TransactionTable from "../../transactionTable/transactionTable.tsx";


interface ITransactions {}

export default function Transactions({}: ITransactions) {
  const [filterFraud, setFilterFraud] = useState<fraud[]>(['access', 'fraud', 'suspicious']);
  const [limit, setLimit] = useState(100);


  function filterToggle(fraud: fraud) {
    const updatedFilterFraud = filterFraud.includes(fraud)
      ? filterFraud.filter((item) => item !== fraud)
      : [...filterFraud, fraud];

    console.log(updatedFilterFraud);
    setFilterFraud(updatedFilterFraud);
  }

  function limitHandler(lm:number) {
      console.log("LM",lm)
      setLimit(lm);
  }

  return (
    <div className={styles.transactions}>
      <div className={'title ' + styles.transactions_title}>
        <div>Транзакции</div>
        <div className={styles.transactions_checkboxes}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Строк</InputLabel>
                <Select
                    value={limit}
                    label="Строк"
                    onChange={(e) => limitHandler(+e.target.value)}
                >
                    <MenuItem value={100}>100 строк</MenuItem>
                    <MenuItem value={1000}>1000 строк</MenuItem>
                    <MenuItem value={5000}>5000 строк</MenuItem>
                </Select>
            </FormControl>


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
      <TransactionTable filterFraud={filterFraud} limit={limit} />




    </div>
  );
}
