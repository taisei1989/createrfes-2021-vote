import { PHASES } from "../../../interfaces";

/**
 * ユーザーの回答を集計する
 *
 */
const CountVotes = ({ currentAnswerA, currentAnswerB, phase }) => {
  if (phase === PHASES.TALLY) {
    return (
      <div>
        <p>{currentAnswerA}: ???</p>
        <p>{currentAnswerB}: ???</p>
        <p>集計中</p>
      </div>
    );
  }
  return null;
};

export default CountVotes;
