import styles from './Sidebar.module.scss';
interface ISidebar {}

export default function Sidebar({}: ISidebar){
    return (
        <div className={styles.sidebar}>
            <div className={'title ' + styles.sidebar_title}>
                Ожидает подтверждения
            </div>

        </div>
    )
}
