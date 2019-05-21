import preact from "preact";

import styles from "./Overlay.css";

const Overlay = ({ overlay, Comp, onDismissOverlay }) => (
  <div>
    <div
      class={`${styles.overlay} ${overlay ? "" : styles.hidden}`}
      onClick={onDismissOverlay}
      onKeyDown={onDismissOverlay}
      role="button"
      tabIndex="-1"
    />
    <div class={`${styles.content} ${overlay ? styles.in : styles.out}`}>
      {Comp && <Comp />}
    </div>
  </div>
);

export default Overlay;
