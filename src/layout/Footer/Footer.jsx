import preact from "preact";

import styles from "./Footer.css";

const Footer = () => (
  <footer class={styles.footer}>
    <p>
      LeJob HQ by{" "}
      <a href="http://antoniovdlc.me">Antonio Villagra De La Cruz</a>. The{" "}
      <a href="https://github.com/lejobhq">source code</a> is licensed{" "}
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
    </p>
  </footer>
);

export default Footer;
