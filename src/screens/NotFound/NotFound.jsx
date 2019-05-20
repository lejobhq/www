import preact from "preact";

import styles from "./NotFound.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";

const NotFound = ({ backToLanding }) => (
  <div class={styles["not-found"]}>
    <Header />
    <Main>
      <p>We can't find what you are looking for ...</p>
      <Button type="secondary" handler={backToLanding}>
        Back
      </Button>
    </Main>
    <Footer />
  </div>
);

export default NotFound;
