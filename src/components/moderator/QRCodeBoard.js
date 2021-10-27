import { useRef } from "react";
import { PHASES } from "../../interfaces";
import styles from "./ModeratorCommon.module.scss";
import { CSSTransition } from "react-transition-group";
//import { PHASES } from "../../interfaces";

const QRCodeBoard = ({ phase }) => {
  // TODO: Prepareフェーズの時は、QRコードを大きく表示
  const isShown = phase === PHASES.PREPARE;
  const elementRef = useRef(null);

  return (
    <CSSTransition
      in={isShown}
      nodeRef={elementRef}
      timeout={1000}
      classNames={{
        enter: styles.qrCodeEnter,
        enterActive: styles.qrCodeEnterActive,
        enterDone: styles.qrCodeEnterDone,
        exit: styles.qrCodeExit,
        exitActive: styles.qrCodeExitActive,
        exitDone: styles.qrCodeExitDone,
      }}
    >
      <div className={styles.qrCodeBoard} ref={elementRef}>
        <img src="images/moderator/new-qr-code-board.png" alt="" />
      </div>
    </CSSTransition>
  );
};

export default QRCodeBoard;
