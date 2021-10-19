import { PHASES } from "../../interfaces";
import styles from "./UserCommon.module.scss";

const UserPreparationView = ({ phase }) => {
  if (phase === PHASES.GUIDE || phase === PHASES.PREPARE) {
    return (
      <div className={styles.preparationPanel}>
        <p className={styles.title}>ただいま準備中…</p>
        <div className={styles.guide}>
          <div className={styles.innerText}>お題を用意しているよ！</div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserPreparationView;
