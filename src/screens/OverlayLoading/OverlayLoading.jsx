import preact from "preact";

import styles from "./OverlayLoading.css";

import Spinner from "../../components/Spinner";

const OverlayLoading = () => (
  <div class={styles["overlay-loading"]}>
    <Spinner />
  </div>
);

export default OverlayLoading;
