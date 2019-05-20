import preact from "preact";

import styles from "./NotFound.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

const NotFound = () => (
  <div class={styles["not-found"]}>
    <Header />
    <Main>
      <p>We can't find what you are looking for ...</p>
    </Main>
    <Footer />
  </div>
);

export default NotFound;
