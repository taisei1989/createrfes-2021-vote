import { PHASES } from "../../interfaces";
import styles from "./ModeratorCommon.module.scss";

const ModeratorPrepareView = ({ phase }) => {
  if (phase === PHASES.PREPARE) {
    return (
      <div className={styles.preparePanel}>
        <img src={`ready.jpg`} alt="createrfes-vote-ready" />
      </div>
    );
  }
  return null;
};

export default ModeratorPrepareView;
