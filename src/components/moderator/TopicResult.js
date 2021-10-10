import { getDatabase, onValue, onDisconnect, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import styles from "./TopicAnswerPanel.module.scss";
import { VotesResultA, VotesResultB, VotesTally } from "./VotesResult";
import { PHASES } from "../../interfaces";

import * as CONF from "../../configs";

/**
 * お題と答えを表示するパネル
 */
const TopicResult = ({ phase }) => {
  const [topic, setTopic] = useState({
    text: "",
    answerA: "",
    answerB: "",
  });

  useEffect(() => {
    const db = getDatabase();
    const refCurrent = ref(db, "current/");

    onValue(refCurrent, (snapshot) => {
      const topicText = snapshot.val().currentTopicText;
      const answerA = snapshot.val().currentAnswerA;
      const answerB = snapshot.val().currentAnswerB;

      if (CONF.IS_DEBUG)
        console.log("トピックの変更を検知しました", {
          topic: topicText,
          answerA: answerA,
          answerB: answerB,
        });

      if (topic && answerA && answerB) {
        // 適応する
        setTopic({
          text: topicText,
          answerA: answerA,
          answerB: answerB,
        });
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      onDisconnect(refCurrent);
    };
  }, []);

  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topic}>{topic.text}</div>
      <div className={styles.answerAPanel}>
        <p className={styles.choiceA}>A</p>
        <p className={styles.answerA}>{topic.answerA}</p>
        {VotesResultA({ phase })}
        <p className={styles.voteResult}>{VotesTally({ phase })}</p>
      </div>
      <div className={styles.answerBPanel}>
        <p className={styles.choiceA}>B</p>
        <p className={styles.answerA}>{topic.answerB}</p>
        {VotesResultB({ phase })}
        <p className={styles.voteResult}>{VotesTally({ phase })}</p>
      </div>
    </div>
  );
};

export default TopicResult;