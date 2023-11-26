import styles from './Transaction.module.scss';
import {ITransaction} from "../../types/transactions.interface.ts";
import {CheckSquare2, XSquare} from "lucide-react";
import {ICheckTransaction} from "../../types/ICheckTransaction.ts";
import {useCheckTransaction} from "../../hooks/useCheckTransaction/useCheckTransaction.ts";




export default function Transaction({id, fraud, customer, age, amount, sex, category, zipcodeOriginal, merchant, zipMerchant, sus}: ITransaction){
    console.log(sus, sus>=0.5)
    const {mutate} = useCheckTransaction()
    function CheckTransaction({id, check}:ICheckTransaction) {
        mutate({id, check})
    }
    return (
        <div className={styles.transaction} data-fraud={fraud} >
            <div>{id}</div>
            <div>{customer}</div>
            <div>{
                age === '0' ? '<= 18' :
                age === '1' ? '19-25' :
                age === '2' ? '26-35' :
                age === '3' ? '36-45' :
                age === '4' ? '46-55' :
                age === '5' ? '56-65' :
                age === '6' ? '>= 66' :
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
            {
                <div className={styles.transaction_sus + ' ' + (fraud!=='suspicious'&&styles.none)}>
                    <div
                        className={styles.transaction_check}
                        onClick={()=>CheckTransaction({id, check: true})}
                    >
                        <CheckSquare2 />
                    </div>
                    <div className={styles.transaction_percent} data-sus={sus>=0.5?'red':'green'}>
                        {String(sus*100).substring(0, 4)}%
                    </div>

                    <div
                        className={styles.transaction_times}
                        onClick={()=>CheckTransaction({id, check: false})}
                    >
                        <XSquare />
                    </div>
                </div>
            }


        </div>
    )
}
