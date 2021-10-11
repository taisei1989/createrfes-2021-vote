import { onDisconnect, onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./ResultDisplay.module.scss";

/**
 * ユーザーの回答を集計する
 * 回答集計後、集計結果を表示する責務を負う
 */

const ResultDisplay = ({ currentAnswerA, currentAnswerB, phase }) => {
  const [numOfAnswers, setNumOfAnswers] = useState({ a: 0, b: 0 });

  // Firebase から集計のデータを受け取る
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

  if (phase === PHASES.RESULT) {
    return (
      <div>
        <div className={styles.topicAnswerResult}>
          <p className={styles.topicAnswer}>{currentAnswerA}</p>
          <p className={styles.voteResult}>{numOfAnswers.a} %</p>
          <button className={styles.goodPanel}>Good</button>
        </div>
        <div className={styles.topicAnswerResult}>
          <p className={styles.topicAnswer}> {currentAnswerB} </p>
          <p className={styles.voteResult}>{numOfAnswers.b} %</p>
          <button className={styles.badPanel}>Bad</button>
        </div>
        <button className={styles.twitterShare}>結果をつぶやく</button>
        <p className={styles.commentShare}>感想をシェアしよう！</p>
      </div>
    );
  }
  return null;
};

export default ResultDisplay;
