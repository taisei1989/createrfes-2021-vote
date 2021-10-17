import { getDatabase, onValue, onDisconnect, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import styles from "./TopicAnswerPanel.module.scss";

import * as CONF from "../../configs";
import { PHASES } from "../../interfaces";

const isDebug = CONF.IS_DEBUG && true;

/**
 * お題と答えを表示するパネル
 */
const TopicAnswerPanel = ({ phase }) => {
  const [topic, setTopic] = useState({
    topicText: "",
    answerA: "",
    answerB: "",
  });

  const dispTopic =
    phase === PHASES.VOTE || phase === PHASES.TALLY || phase === PHASES.RESULT
      ? topic
      : {
          topicText: "お題を準備しています",
          answerA: "？？？",
          answerB: "？？？",
        };

  // Connect to Firebase Database
  useEffect(() => {
    const db = getDatabase();
    const refCurrent = ref(db, "current/");

    const unsubscribe = onValue(refCurrent, (snapshot) => {
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
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topic}>{dispTopic.topicText}</div>
      <div className={styles.answerAPanel}>
        <p className={styles.choiceA}>A</p>
        <p className={styles.answerA}>{dispTopic.answerA}</p>
      </div>
      <div className={styles.answerBPanel}>
        <p className={styles.choiceA}>B</p>
        <p className={styles.answerA}>{dispTopic.answerB}</p>
      </div>
    </div>
  );
};

export default TopicAnswerPanel;
