import styles from './Transaction.module.scss';
import {ITransaction} from "../../types/transactions.interface.ts";




export default function Transaction({fraud, customer, age, amount, sex, category, zipcodeOriginal, merchant, zipMerchant}: ITransaction){
    return (
        <div className={styles.transaction} data-fraud={fraud} >
            <div>{customer}</div>
            <div>{
                age === 0 ? '<= 18' :
                age === 1 ? '19-25' :
                age === 2 ? '26-35' :
                age === 3 ? '36-45' :
                age === 4 ? '46-55' :
                age === 5 ? '56-65' :
                age === 6 ? '>= 66' :
                    'Неизвестен'
            }</div>
            <div>{
                sex === 'M' ? 'Мужской'
                : sex === 'F' ? 'Женский'
                    :sex === 'E' ? 'Предприятие'
                        : sex === 'U' ? 'Неизвестно'
                            : 'Неизвестен'
            }</div>
            <div>{category}</div>
            <div>{amount}</div>
            <div>{zipcodeOriginal}</div>
            <div>{merchant}</div>
            <div>{zipMerchant}</div>
        </div>
    )
}
