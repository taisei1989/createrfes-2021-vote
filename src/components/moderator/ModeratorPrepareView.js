import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { PHASES } from "../../interfaces";
import styles from "./ModeratorPreparePanel.module.scss";

const ModeratorPrepareView = ({ phase }) => {
  const isShown = phase === PHASES.PREPARE;
  const elementRef = useRef(null);

  return (
    <CSSTransition
      in={isShown}
      nodeRef={elementRef}
      timeout={500}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
        exit: styles.exit,
        exitActive: styles.exitActive,
        exitDone: styles.exitDone,
      }}
    >
      <div className={styles.preparePanel} ref={elementRef}>
        <img src={"images/moderator/prepare.jpg"} alt="準備中のパネル画像" />
      </div>
    </CSSTransition>
  );
};

export default ModeratorPrepareView;
