import preact from "preact";

import styles from "./Error.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

const Error = () => (
  <div class={styles.error}>
    <Header />
    <Main>
      <p>Oops, an error occured ... please try again!</p>
    </Main>
    <Footer />
  </div>
);

export default Error;
