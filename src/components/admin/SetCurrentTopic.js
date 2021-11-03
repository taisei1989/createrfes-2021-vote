import { onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { db } from "../../services/firebase";

import styles from "../../pages/AdminPage.module.scss";

const SetCurrentTopic = ({ id, text, answerA, answerB }) => {
  const [numOfVote, setnumOfVote] = useState({ a: 0, b: 0 });

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

      // 反映する
      setnumOfVote({ a: numOfVoteA, b: numOfVoteB });
    });

    return () => {
      unsubscribeVote();
    };
  }, []);

  return (
    <div className={styles.currentTopicPanel}>
      <h3 className={styles.title}>現在のお題</h3>
      <p className={styles.currentTopicHeader}>ID</p>
      <p>{id}</p>
      <p className={styles.currentTopicHeader}>お題</p>
      <p>{text}</p>
      <p className={styles.currentTopicHeader}>投票A</p>
      <p>{answerA}</p>
      <p className={styles.currentTopicHeader}>投票B</p>
      <p>{answerB}</p>
      <p className={styles.currentTopicHeader}>投票結果A</p>
      <p>{numOfVote.a}</p>
      <p className={styles.currentTopicHeader}>投票結果B</p>
      <p>{numOfVote.b}</p>
    </div>
  );
};

export default SetCurrentTopic;
