import { getDatabase, onValue, onDisconnect, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import styles from "./TopicAnswerPanel.module.scss";
import { VotesResultA, VotesResultB } from "./VotesResult";
import { PHASES } from "../../interfaces";

import * as CONF from "../../config";

/**
 * お題と答えを表示するパネル
 */
const TopicAnswerPanel = () => {
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const refCurrent = ref(db, "current/");

    onValue(refCurrent, (snapshot) => {
      const topic = snapshot.val().currentTopicText;
      const answerA = snapshot.val().currentAnswerA;
      const answerB = snapshot.val().currentAnswerB;

      if (CONF.IS_DEBUG)
        console.log("トピックの変更を検知しました", {
          topic: topic,
          answerA: answerA,
          answerB: answerB,
        });

      if (topic && answerA && answerB) {
        // 適応する
        setTopic(topic);
        setAnswerA(answerA);
        setAnswerB(answerB);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      onDisconnect(refCurrent);
    };
  }, []);

  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topic}>{topic}</div>
      <div className={styles.answerA}>{answerA}</div>
      <div className={styles.answerB}>{answerB}</div>
    </div>
  );
};

export default TopicAnswerPanel;
