import { PHASES } from "../../interfaces";
import styles from "./TopicAnswerPanel.module.scss";

const PreparePage = ({ phase }) => {
  if (phase === PHASES.PREPARE) {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/ready.jpg`}
        className={styles.readyVisual}
        alt="createrfes-vote-ready"
      />
    );
  }
  return null;
};

export default PreparePage;
