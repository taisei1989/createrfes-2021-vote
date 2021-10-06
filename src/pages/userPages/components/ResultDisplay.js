import { PHASES } from "../../../interfaces";

/**
 * ユーザーの回答を集計する
 *
 */
const ResultDisplay = ({ currentAnswerA, currentAnswerB, phase }) => {
  if (phase === PHASES.RESULT) {
    return (
      <div>
        <p>{currentAnswerA}: 30%</p>
        <p>{currentAnswerB}: 70%</p>
        <button>Good</button>
        <button>Bad</button>
        <br />
        <button>結果をつぶやく</button>
        <p>感想をシェアしよう！</p>
      </div>
    );
  }
  return null;
};

export default ResultDisplay;
