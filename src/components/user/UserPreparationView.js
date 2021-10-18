import { PHASES } from "../../interfaces";
import styles from "./UserPreparationPanel.module.scss";

const UserPreparationView = ({ phase }) => {
  if (phase === PHASES.GUIDE || phase === PHASES.PREPARE) {
    return (
      <div className={styles.preparationPanel}>
        <p>ただいま準備中…</p>
        <p>お題を用意しているよ！</p>
      </div>
    );
  }
  return null;
};

export default UserPreparationView;
