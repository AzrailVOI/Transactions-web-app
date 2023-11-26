import './App.module.scss'
import styles from './App.module.scss'
import Transactions from "./components/global/transactions/Transactions.tsx";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import AddTransactionPage from "./components/global/addTransactionPage/AddTransactionPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Transactions/>,
  },
  {
    path: "add",
    element: <AddTransactionPage/>,
  },
]);
function App() {
  return (
    <div className={styles.main}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
