import preact from "preact";

import styles from "./Footer.css";

const Footer = () => (
  <footer class={styles.footer}>
    <p>
      <span>
        LeJob HQ by{" "}
        <a href="http://antoniovdlc.me">Antonio Villagra De La Cruz</a>. The{" "}
        <a href="https://github.com/lejobhq">source code</a> is licensed{" "}
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </span>
      <br />
      <span>
        Icons made by{" "}
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>{" "}
        are licensed{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          CC 3.0 BY.
        </a>
      </span>
    </p>
  </footer>
);

export default Footer;
