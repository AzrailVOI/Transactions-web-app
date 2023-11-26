import styles from './Transactions.module.scss';
import {Checkbox, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import { fraud } from '../../../types/fraud.type.ts';
import TransactionTable from "../../transactionTable/transactionTable.tsx";
import {useDispatch} from "react-redux";
import {setFilterLimit, setFilterOffset, setFilterStatus} from "../../../redux/filterParams/filterParams.slice.ts";
import {useTypedSelector} from "../../../hooks/useTypedSelector/useTypedSelector.ts";
import {Link} from "react-router-dom";


interface ITransactions {}

export default function Transactions({}: ITransactions) {
  const [filterFraud, setFilterFraud] = useState<fraud[]>(['access', 'fraud', 'suspicious']);
  const [limit, setLimit] = useState(100);
    const dispatch = useDispatch()
    const filterParams = useTypedSelector((state) => state.filterParams)
  function filterToggle(fraud: fraud) {
    const updatedFilterFraud = filterFraud.includes(fraud)
      ? filterFraud.filter((item) => item !== fraud)
      : [...filterFraud, fraud];

    console.log(updatedFilterFraud);
    let statusStr:string = '';
    updatedFilterFraud.map((item, index) => {
        switch (item) {
            case 'access':
                statusStr += 'a' + (index!==updatedFilterFraud.length-1 ? ':' : '')
                break;
            case 'fraud':
                statusStr += 'f' + (index!==updatedFilterFraud.length-1 ? ':' : '')
                break;
            case 'suspicious':
                statusStr += 's' + (index!==updatedFilterFraud.length-1 ? ':' : '')
                break;
        }
    })
    setFilterFraud(updatedFilterFraud);
    dispatch(setFilterStatus(statusStr))
  }

  function limitHandler(lm:number) {
      console.log("LM",lm)
      setLimit(lm);
      dispatch(setFilterLimit(lm))
  }

  return (
    <div className={styles.transactions}>
      <div className={'title ' + styles.transactions_title}>
        <div>Транзакции</div>
          <Link
              to={'/add'}
              className={styles.transactions_to}
          >
              {/*<div>Vasya generator</div>*/}
          </Link>

        <div className={styles.transactions_checkboxes}>
            <TextField id="outlined-basic"
                       label="Страница"
                       size="small"
                       type={'number'}
                       variant="outlined"
                       value={filterParams.offset===0?1:filterParams.offset}
                       onChange={(e)=>dispatch(setFilterOffset(+e.target.value))}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Строк</InputLabel>
                <Select
                    value={limit}
                    label="Строк"
                    onChange={(e) => limitHandler(+e.target.value)}
                >
                    <MenuItem value={10}>10 строк</MenuItem>
                    <MenuItem value={50}>50 строк</MenuItem>
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
