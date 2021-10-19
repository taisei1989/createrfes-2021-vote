import { PHASES } from "../../interfaces";
import styles from "./UserCommon.module.scss";

/**
 * ユーザーの回答を集計する
 *
 */

const TallyVotes = ({ currentAnswerA, currentAnswerB, phase }) => {
  if (phase === PHASES.TALLY) {
    return (
      <div>
        <div className={styles.topicAnswerResult}>
          <div className={styles.voteResult}>??%</div>
        </div>
        <div className={styles.topicAnswerResult}>
          <div className={styles.voteResult}>??%</div>
        </div>
        <div className={styles.guide}>
          <div className={styles.innerText}>集計中…！</div>
        </div>
      </div>
    );
  }
  return null;
};

export default TallyVotes;
