import React, { useEffect, useState } from "react";
import { ref, onValue, onDisconnect } from "firebase/database";
import { db } from "../../services/firebase";
import { Redirect } from "react-router";

import Logout from "./components/logout";
import HandlePhase from "./components/handlePhase";
import { useAuthContext } from "./components/authContext";
import { submitTopic } from "./components/handleSubmit";
import { topicRemove } from "./components/topicRemove";
import { handleCurrentTopic } from "./components/handleCurrentTopic";

const AdminPage = () => {
  const { user } = useAuthContext();
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState([]);

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
    const topicRef = ref(db, "topics/");
    const currentTopicRef = ref(db, "current/");

    // お題データの取得と保存
    onValue(topicRef, (snapshot) => {
      const topicsUpdated = Object.values(snapshot.val());
      if (topicsUpdated) {
        setTopics(topicsUpdated);
      }
    });

    // 現在のお題データの取得と保存
    onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = Object.values(snapshot.val());
      // nullチェック
      console.log(currentTopicUpdated);
      if (currentTopicUpdated) {
        setCurrentTopic(currentTopicUpdated);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      onDisconnect(topicRef);
      onDisconnect(currentTopicRef);
    };
  }, []);

  if (!user) {
    return <Redirect to="/admin/login" />;
  } else {
    return (
      <div>
        <h2>現在のお題</h2>
        <ul>
          <li>ID：{currentTopic[2]}</li>
          <li>お題：{currentTopic[3]}</li>
          <li>投票A：{currentTopic[0]}</li>
          <li>投票B：{currentTopic[1]}</li>
        </ul>
        <br />
        <h2>お題設定</h2>
        <form
          onSubmit={(event) => {
            submitTopic(event, topic, answerA, answerB);
            setTopic("");
            setAnswerA("");
            setAnswerB("");
          }}
        >
          <div>
            <label>お題：</label>
            <input
              type="text"
              value={topic}
              placeholder="お題を記入"
              onChange={handleChangeTopic}
            />
          </div>
          <div>
            <label>投票A：</label>
            <input
              type="text"
              value={answerA}
              placeholder="投票Aを記入"
              onChange={handleChangeAnswerA}
            />
          </div>
          <div>
            <label>投票B：</label>
            <input
              type="text"
              value={answerB}
              placeholder="投票Bを記入"
              onChange={handleChangeAnswerB}
            />
          </div>
          <button type="submit">追加する</button>
        </form>
        <br />
        <h2>お題と回答一覧</h2>
        {topics.map((topic) => (
          <div key={topic.topicId}>
            <ul>
              <li>ID：{topic.topicId}</li>
              <li>お題：{topic.topicText}</li>
              <li>投票A：{topic.topicAnswerA}</li>
              <li>投票B：{topic.topicAnswerB}</li>
            </ul>
            {topicRemove(topic)}
            <button
              onClick={() => {
                setCurrentTopic(topic);
                handleCurrentTopic(
                  topic.topicId,
                  topic.topicText,
                  topic.topicAnswerA,
                  topic.topicAnswerB
                );
              }}
            >
              現在のお題に設定
            </button>
            <p></p>
            <br />
          </div>
        ))}
        <HandlePhase />
        <Logout />
      </div>
    );
  }
};

export default AdminPage;
