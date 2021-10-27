import { PHASES } from "../../interfaces";
import styles from "./JudgeCharacter.module.scss";

const JudgeCharacter = ({ phase }) => {
  let cn = "";

  switch (phase) {
    case PHASES.TALLY:
      cn = styles.tally;
      break;
    case PHASES.RESULT:
      // TODO 集計結果から分岐して、どちらを向くか決める
      cn = styles.resultA;
      break;
    default:
      cn = styles.idle;
      break;
  }

  return (
    <div className={styles.judgeCharacter}>
      <img className={cn} src="images/moderator/judge-wakayama.png" alt="" />
    </div>
  );
};

export default JudgeCharacter;
