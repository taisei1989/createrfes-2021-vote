import styles from "./ModeratorCommon.module.scss";
//import { PHASES } from "../../interfaces";

const QRCodeBoard = ({ phase }) => {
  // TODO: Prepareフェーズの時は、QRコードを大きく表示
  return (
    <div className={styles.qrCodeBoard}>
      <img src="images/moderator/qr-code-board.png" alt="" />
    </div>
  );
};

export default QRCodeBoard;
