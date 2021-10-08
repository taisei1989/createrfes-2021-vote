import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue, onDisconnect } from "@firebase/database";
import styles from "./TopicAnswerPanel.module.scss";
import { VotesResultA, VotesResultB } from "./VotesResult";
import { PHASES } from "../../interfaces";

/**
 * お題と答えを表示するパネル
 */
const TopicAnswerPanel = ({ phase }) => {
  const [currentTopic, setCurrentTopicText] = useState({
    text: "",
    answerA: "",
    answerB: "",
  });

  useEffect(() => {
    const currentTopicRef = ref(db, "current/");

    // ここでお題と答えを取得する処理
    onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = {
        text: snapshot.val().currentTopicText,
        answerA: snapshot.val().currentAnswerA,
        answerB: snapshot.val().currentAnswerB,
      };

      if (currentTopicUpdated) {
        setCurrentTopicText({
          text: currentTopicUpdated.text,
          answerA: currentTopicUpdated.answerA,
          answerB: currentTopicUpdated.answerB,
        });
      }
    });

    return () => {
      onDisconnect(currentTopicRef);
    };
  }, []);

  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topic}>{currentTopic.text}</div>
      <div className={styles.answerA}>
        {currentTopic.answerA}
        <br />
        {VotesResultA({ phase })}
      </div>
      <div className={styles.answerB}>
        {currentTopic.answerB}
        <br />
        {VotesResultB({ phase })}
      </div>
    </div>
  );
};

export default TopicAnswerPanel;
