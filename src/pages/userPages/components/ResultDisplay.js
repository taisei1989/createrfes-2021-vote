import { onDisconnect, onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { PHASES } from "../../../interfaces";
import { db } from "../../../services/firebase";

/**
 * ユーザーの回答を集計する
 *
 */
const ResultDisplay = ({ currentAnswerA, currentAnswerB, phase }) => {
  const [numOfAnswers, setNumOfAnswers] = useState({ a: 0, b: 0 });

  // TODO: Firebase から集計のデータを受け取る
  useEffect(() => {
    const voteRef = ref(db, "votes/");

    onValue(voteRef, (snapshot) => {
      const votesUpdated = Object.values(snapshot.val());

      // 集計結果
      let numOfVoteA = 0;
      let numOfVoteB = 0;

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVoteA++;
          } else if (answer === "B") {
            numOfVoteB++;
          } else {
            console.log("不明な投票を検知しました", answer);
          }
        }
      }

      const PercentOfVoteA = Math.round(
        (numOfVoteA / (numOfVoteA + numOfVoteB)) * 100
      );
      const PercentOfVoteB = Math.round(
        (numOfVoteB / (numOfVoteA + numOfVoteB)) * 100
      );

      // 反映する
      setNumOfAnswers({ a: PercentOfVoteA, b: PercentOfVoteB });
    });

    return () => {
      onDisconnect(voteRef);
    };
  }, []);

  console.log(numOfAnswers);

  // TODO: 受け取ったデータからA, Bそれぞれの集計を行いデータをこのコンポーネント内で保持する

  if (phase === PHASES.RESULT) {
    return (
      <div>
        <p>
          {currentAnswerA}: {numOfAnswers.a} %
        </p>
        <p>
          {currentAnswerB}: {numOfAnswers.b} %
        </p>
        <button>Good</button>
        <button>Bad</button>
        <br />
        <button>結果をつぶやく</button>
        <p>感想をシェアしよう！</p>
        {}
      </div>
    );
  }
  return null;
};

export default ResultDisplay;
