import './App.module.scss'
import styles from './App.module.scss'
import Transactions from "./components/global/transactions/Transactions.tsx";
function App() {
  return (
    <div className={styles.main}>
      {/*<Sidebar/>*/}
      <Transactions/>

    </div>
  )
}

export default App
