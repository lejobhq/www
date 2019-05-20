import preact from 'preact'

import styles from './Header.css'

const Header = ({ children }) => 
  <header class={styles.header}>
    {children}
  </header>

export default Header