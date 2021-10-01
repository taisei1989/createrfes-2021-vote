import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../services/firebase";
import { Redirect } from "react-router";

import Logout from "./components/logout";
import HandlePhase from "./components/handlePhase";
import { useAuthContext } from "./components/authContext";
import { submitTopic } from "./components/handleSubmit";
import { topicRemove } from "./components/topicRemove";

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

  // データの一覧表示
  useEffect(() => {
    const topicRef = ref(db, "topics/");
    onValue(topicRef, (snapshot) => {
      if (snapshot.val() === null) {
        setTopics([]);
      } else {
        console.log(snapshot.val());
        const topics = Object.values(snapshot.val());
        setTopics(topics);
      }
    });
  }, []);

  // 現在のお題へ設定
  const handleCurrentTopic = (topic) => {
    setCurrentTopic(topic);
  };

  if (!user) {
    return <Redirect to="/admin/login" />;
  } else {
    return (
      <div>
        <h2>現在のお題</h2>
        <ul>
          <li>ID：{currentTopic.topicId}</li>
          <li>お題：{currentTopic.topicText}</li>
          <li>投票A：{currentTopic.topicAnswerA}</li>
          <li>投票B：{currentTopic.topicAnswerB}</li>
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
                handleCurrentTopic(topic);
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
