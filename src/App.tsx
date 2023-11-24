import './App.module.scss'
import styles from './App.module.scss'
import Sidebar from "./components/global/sidebar/Sidebar.tsx";
function App() {
  return (
    <div className={styles.main}>
      <Sidebar/>
      <span className="title">App</span>

    </div>
  )
}

export default App
