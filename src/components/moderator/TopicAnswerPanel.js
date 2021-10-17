import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import styles from "./TopicAnswerPanel.module.scss";

import * as CONF from "../../configs";
import { PHASES } from "../../interfaces";

const isDebug = CONF.IS_DEBUG && true;

/** -----------------------------------
 * 答えの%を表示する
 */
const Result = ({ phase, perAnswer }) => {
  if (phase === PHASES.TALLY) {
    return <p className={styles.result}>？？ %</p>;
  } else if (phase === PHASES.RESULT) {
    return <p className={styles.result}>{perAnswer} %</p>;
  }
  return null;
};

/** -----------------------------------
 * お題と答えを表示するパネル
 */
const TopicAnswerPanel = ({ phase }) => {
  const [topic, setTopic] = useState({
    topicText: "",
    answerA: "",
    answerB: "",
  });
  const [perAnswers, setPerAnswers] = useState({
    perAnswerA: 50,
    perAnswerB: 50,
  });

  // get Topic and Answer
  useEffect(() => {
    // Firebase Database
    const db = getDatabase();
    const refCurrent = ref(db, "current/");

    const unsubscribeCurrent = onValue(refCurrent, (snapshot) => {
      const topicText = snapshot.val().currentTopicText;
      const answerA = snapshot.val().currentAnswerA;
      const answerB = snapshot.val().currentAnswerB;

      if (isDebug)
        console.log("トピックの変更を検知しました", {
          topic: topicText,
          answerA: answerA,
          answerB: answerB,
        });

      if (topicText && answerA && answerB) {
        // 適応する
        setTopic({ topicText, answerA, answerB });
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      unsubscribeCurrent();
    };
  }, []);

  // get num of answers
  useEffect(() => {
    const db = getDatabase();
    const votesRef = ref(db, "votes/");

    const unsubscribeVotes = onValue(votesRef, (snapshot) => {
      const votesUpdated = Object.values(snapshot.val());

      // 集計結果
      const numOfVotes = { numOfVoteA: 0, numOfVoteB: 0 };

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVotes.numOfVoteA++;
          } else if (answer === "B") {
            numOfVotes.numOfVoteB++;
          } else {
            if (isDebug) console.error("不明な投票を検知しました", answer);
          }
        }
      }

      let votesLength = numOfVotes.numOfVoteA + numOfVotes.numOfVoteB;
      if (votesLength === 0) votesLength = 1;
      const perAnswerA = Math.round(
        (numOfVotes.numOfVoteA / votesLength) * 100
      );
      const perAnswerB = Math.round(
        (numOfVotes.numOfVoteB / votesLength) * 100
      );

      setPerAnswers({ perAnswerA, perAnswerB });
    });

    return () => {
      unsubscribeVotes();
    };
  }, []);

  const dispTopic =
    phase === PHASES.VOTE || phase === PHASES.TALLY || phase === PHASES.RESULT
      ? topic
      : {
          topicText: "お題を準備しています",
          answerA: "？？？",
          answerB: "？？？",
        };

  // Render
  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topicText}>{dispTopic.topicText}</div>

      <div className={styles.answersWrapper}>
        <div className={styles.answerA}>
          <p className={styles.choice}>A</p>
          <p className={styles.answer}>{dispTopic.answerA}</p>
          <Result phase={phase} perAnswer={perAnswers.perAnswerA} />
        </div>

        <div className={styles.answerB}>
          <p className={styles.choice}>B</p>
          <p className={styles.answer}>{dispTopic.answerB}</p>
          <Result phase={phase} perAnswer={perAnswers.perAnswerB} />
        </div>
      </div>
    </div>
  );
};

export default TopicAnswerPanel;
