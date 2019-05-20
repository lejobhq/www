import preact from "preact";

import styles from "./Loading.css";

import Header from "../../layout/Header";
import Main from "../../layout/Main";
import Footer from "../../layout/Footer";

import Spinner from "../../components/Spinner";

const Loading = () => (
  <div class={styles.loading}>
    <Header />
    <Main>
      <Spinner />
    </Main>
    <Footer />
  </div>
);

export default Loading;
