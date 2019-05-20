import preact from "preact";

import styles from "./Overlay.css";

const Overlay = ({ children, dismissOverlay }) => (
  <div>
    <div
      class={styles.overlay}
      onClick={dismissOverlay}
      onKeyDown={dismissOverlay}
      role="button"
      tabIndex="-1"
    />
    <div class={styles.content}>{children}</div>
  </div>
);

export default Overlay;
