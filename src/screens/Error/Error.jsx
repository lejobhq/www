import preact from "preact";

import styles from "./Error.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Button from "../../components/Button";

const Error = ({ backToLanding }) => (
  <div class={styles.error}>
    <Header />
    <Main>
      <p>Oops, an error occured ... please try again!</p>
      <Button type="secondary" handler={backToLanding}>
        Back
      </Button>
    </Main>
    <Footer />
  </div>
);

export default Error;
