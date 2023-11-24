import styles from './Sidebar.module.scss';
import {useTypedSelector} from "../../../hooks/useTypedSelector/useTypedSelector.ts";
import Transaction from "../../transaction/Transaction.tsx";
interface ISidebar {}

export default function Sidebar({}: ISidebar){
    const transactions = useTypedSelector((state) => state.transactions)
    return (
        <div className={styles.sidebar}>
            <div className={'title ' + styles.sidebar_title}>
                Ожидает подтверждения
            </div>
            <div className={styles.sidebar_sus}>
                <div>
                    {
                        transactions.map((transaction) => (
                            transaction.fraud === 'suspicious' &&
                            <Transaction
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
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
