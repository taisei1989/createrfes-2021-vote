import { PHASES } from "../../../interfaces";
import styles from "./TallyVotes.module.scss";

/**
 * ユーザーの回答を集計する
 *
 */

const TallyVotes = ({ currentAnswerA, currentAnswerB, phase }) => {
  if (phase === PHASES.TALLY) {
    return (
      <div>
        <div className={styles.topicAnswerResult}>
          <p className={styles.topicAnswer}>{currentAnswerA}</p>
          <p className={styles.voteResult}>???</p>
        </div>
        <div className={styles.topicAnswerResult}>
          <p className={styles.topicAnswer}>{currentAnswerB}</p>
          <p className={styles.voteResult}>???</p>
        </div>
        <p className={styles.tally}>集計中…！</p>
      </div>
    );
  }
  return null;
};

export default TallyVotes;
