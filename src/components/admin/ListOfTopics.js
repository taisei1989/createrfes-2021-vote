import { useEffect, useState } from "react";
import RemoveTopic from "./RemoveTopic";
import { createVotesNode } from "./createNewChildNode";
import { updatedCurrentTopic } from "./updatedCurrentTopic";
import { onValue, ref } from "@firebase/database";
import { db } from "../../services/firebase";

import styles from "../../pages/AdminPage.module.scss";
import { IS_DEBUG } from "../../configs";

const isDebug = IS_DEBUG && false;

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
      if (isDebug) {
        console.log(topicsUpdated);
      }
    });

    return () => {
      unsubscribeTopic();
    };
  });

  return (
    <div className={styles.ListOfTopicAndAnswer}>
      <h3 className={styles.title}>お題と回答一覧</h3>
      {topics.map((topic) => (
        <div key={topic.topicId} className={styles.topicAndAnswer}>
          <p className={styles.topicItemName}>ID</p>
          <p>{topic.topicId}</p>
          <p className={styles.topicItemName}>お題</p>
          <p>{topic.topicText}</p>
          <p className={styles.topicItemName}>投票A</p>
          <p>{topic.topicAnswerA}</p>
          <p className={styles.topicItemName}>投票B</p>
          <p>{topic.topicAnswerB}</p>
          <div className={styles.listButtons}>
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
        </div>
      ))}
    </div>
  );
};

export default ListOfTopics;
