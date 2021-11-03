import { useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";
import { Redirect } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { addTopic } from "../components/admin/AddTopic";
import Logout from "../components/admin/Logout";
import PhaseOperation from "../components/admin/PhaseOperation";
import SetCurrentTopic from "../components/admin/SetCurrentTopic";
import ListOfTopics from "../components/admin/ListOfTopics";

import styles from "./AdminPage.module.scss";
import { IS_DEBUG } from "../configs";

const isDebug = IS_DEBUG && false;

const AdminPage = () => {
  const user = useContext(AuthContext);
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [currentTopic, setCurrentTopic] = useState({
    topicId: "",
    topicText: "",
    topicAnswerA: "",
    topicAnswerB: "",
  });

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };
  const handleChangeAnswerA = (event) => {
    setAnswerA(event.target.value);
  };
  const handleChangeAnswerB = (event) => {
    setAnswerB(event.target.value);
  };

  useEffect(() => {
    const currentTopicRef = ref(db, "current/");

    // 現在のお題データの取得と保存
    const unsubscribeCurrent = onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = Object.values(snapshot.val());

      if (currentTopicUpdated) {
        setCurrentTopic({
          topicId: currentTopicUpdated[2],
          topicText: currentTopicUpdated[3],
          topicAnswerA: currentTopicUpdated[0],
          topicAnswerB: currentTopicUpdated[1],
        });
      }

      if (isDebug) {
        console.log(currentTopicUpdated);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      unsubscribeCurrent();
    };
  }, []);

  if (!user) {
    return <Redirect to="/admin/login" />;
  } else {
    return (
      <div className={styles.adminPage}>
        <h2 className={styles.adminPageTitle}>管理者画面</h2>
        <SetCurrentTopic
          id={currentTopic.topicId}
          text={currentTopic.topicText}
          answerA={currentTopic.topicAnswerA}
          answerB={currentTopic.topicAnswerB}
        />
        <PhaseOperation />
        <div className={styles.setTopic}>
          <h3 className={styles.title}>お題設定</h3>
          <div>
            <label>お題</label>
            <input
              type="text"
              value={topic}
              placeholder="お題を記入"
              onChange={handleChangeTopic}
            />
          </div>
          <div>
            <label>投票A</label>
            <input
              type="text"
              value={answerA}
              placeholder="投票Aを記入"
              onChange={handleChangeAnswerA}
            />
          </div>
          <div>
            <label>投票B</label>
            <input
              type="text"
              value={answerB}
              placeholder="投票Bを記入"
              onChange={handleChangeAnswerB}
            />
          </div>
          <button
            onClick={() => {
              addTopic(topic, answerA, answerB);
              setTopic("");
              setAnswerA("");
              setAnswerB("");
            }}
            className={styles.addTopicButton}
          >
            追加する
          </button>
        </div>
        <ListOfTopics />
        <Logout />
      </div>
    );
  }
};

export default AdminPage;
