import { onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./ResultDisplay.module.scss";
import ShareToTwitter from "./ShareToTwitter";

/**
 * ユーザーの回答を集計する
 * 回答集計後、集計結果を表示する責務を負う
 */

const ResultDisplay = ({
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
  phase,
}) => {
  const [numOfAnswers, setNumOfAnswers] = useState({ a: 0, b: 0 });

  // Firebase から集計のデータを受け取る
  useEffect(() => {
    const voteRef = ref(db, "votes/");

    const unsubscribeVote = onValue(voteRef, (snapshot) => {
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

      let sumNumOfVote = numOfVoteA + numOfVoteB;

      if (sumNumOfVote === 0) sumNumOfVote = 1;
      const PercentOfVoteA = Math.round((numOfVoteA / sumNumOfVote) * 100);
      const PercentOfVoteB = Math.round((numOfVoteB / sumNumOfVote) * 100);

      // 反映する
      setNumOfAnswers({ a: PercentOfVoteA, b: PercentOfVoteB });
    });

    return () => {
      unsubscribeVote();
    };
  }, []);

  console.log(numOfAnswers);

  if (phase === PHASES.RESULT) {
    return (
      <div>
        <div className={styles.topicAnswerResult}>
          <div className={styles.voteResult}>{numOfAnswers.a} %</div>
        </div>
        <div className={styles.topicAnswerResult}>
          <div className={styles.voteResult}>{numOfAnswers.b} %</div>
        </div>
        <div className={styles.feedbackPanel}>
          <div>
            <button id="goodPanel"></button>
            <label htmlFor="goodPanel">
              <img src="images/user/feedback-good.png" alt="feedback-good" />
            </label>
          </div>
          <div>
            <button id="badPanel"></button>
            <label htmlFor="badPanel">
              <img src="images/user/feedback-bad.png" alt="feedback-bad" />
            </label>
          </div>
        </div>
        <ShareToTwitter
          currentTopicText={currentTopicText}
          currentAnswerA={currentAnswerA}
          currentAnswerB={currentAnswerB}
          voteResultA={numOfAnswers.a}
          voteResultB={numOfAnswers.b}
        />
        <div className={styles.guide}>
          <div className={styles.innerText}>感想をシェアしよう！</div>
        </div>
      </div>
    );
  }
  return null;
};

export default ResultDisplay;
