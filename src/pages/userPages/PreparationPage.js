import { PHASES } from "../../interfaces";
import styles from "./Preparation.module.scss";

const PreparationPage = ({ phase }) => {
  if (phase === PHASES.GUIDE || phase === PHASES.PREPARE) {
    return (
      <div className={styles.topicAnswerPanel}>
        <img
          className={styles.mainVisual}
          src={`${process.env.PUBLIC_URL}/main-visual.jpg`}
          alt="createrfes-vote-title"
        />
        <p className={styles.topic}>ただいま準備中…</p>
        <p className={styles.comment}>お題を用意しているよ！</p>
      </div>
    );
  }
  return null;
};

export default PreparationPage;
