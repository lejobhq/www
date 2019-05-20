import preact from 'preact'

import styles from './Main.css'

const Main = ({children}) => (
  <main class={styles.main}>
    {children}
  </main>
)

export default Main
