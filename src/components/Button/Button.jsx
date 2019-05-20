import preact from "preact";

import styles from "./Button.css";

const Button = ({ children, handler, type = "primary" }) => (
  <div
    class={`${styles.button} ${styles[type]}`}
    onClick={handler}
    onKeyDown={handler}
    role="button"
    tabIndex="-1"
  >
    {children}
  </div>
);

export default Button;
