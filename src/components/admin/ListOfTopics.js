import { useEffect, useState } from "react";
import RemoveTopic from "./RemoveTopic";
import { createVotesNode } from "./createNewChildNode";
import { updatedCurrentTopic } from "./updatedCurrentTopic";
import { onValue, ref } from "@firebase/database";
import { db } from "../../services/firebase";

import styles from "../../pages/AdminPage.module.scss";

const ListOfTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const topicRef = ref(db, "topics/");

    // お題データの取得と保存
    const unsubscribeTopic = onValue(topicRef, (snapshot) => {
      const topicsUpdated = Object.values(snapshot.val());
      if (topicsUpdated) {
        setTopics(topicsUpdated);
      }
    });

    return () => {
      unsubscribeTopic();
    };
  });

  return (
    <div className={styles.ListOfTopicAndAnswer}>
      <h3>お題と回答一覧</h3>
      {topics.map((topic) => (
        <div key={topic.topicId} className={styles.topicAndAnswer}>
          <ul>
            <li>ID：{topic.topicId}</li>
            <li>お題：{topic.topicText}</li>
            <li>投票A：{topic.topicAnswerA}</li>
            <li>投票B：{topic.topicAnswerB}</li>
          </ul>
          <RemoveTopic topic={topic} />
          <button
            className={styles.addTopicButton}
            onClick={() => {
              updatedCurrentTopic(
                topic.topicId,
                topic.topicText,
                topic.topicAnswerA,
                topic.topicAnswerB
              );
              createVotesNode();
            }}
          >
            現在のお題に設定
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListOfTopics;
