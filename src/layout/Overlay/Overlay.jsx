import preact from "preact";

import styles from "./Overlay.css";

const Overlay = ({ Comp, onDismissOverlay }) => (
  <div>
    <div
      class={styles.overlay}
      onClick={onDismissOverlay}
      onKeyDown={onDismissOverlay}
      role="button"
      tabIndex="-1"
    />
    <div class={styles.content}>
      <Comp />
    </div>
  </div>
);

export default Overlay;
