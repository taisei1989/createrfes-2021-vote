import { PHASES } from "../../interfaces";
import styles from "./UserPreparationPanel.module.scss";

const UserPreparationView = ({ phase }) => {
  if (phase === PHASES.GUIDE || phase === PHASES.PREPARE) {
    return (
      <div className={styles.preparationPanel}>
        <p className={styles.guide}>ただいま準備中…</p>
        <div className={styles.title}>
          <div className={styles.innnerText}>お題を用意しているよ！</div>
        </div>
      </div>
    );
  }
  return null;
};

export default UserPreparationView;
