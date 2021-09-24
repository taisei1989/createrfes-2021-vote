import React, { useEffect, useState } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "../services/Firebase";

const AdminPage = () => {
  
  // データの追加
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [topics, setTopics] = useState([]);

  const handleNewTopic = (event) => {
    setTopic(event.target.value);
  }
  const handleNewAnswerA = (event) => {
    setAnswerA(event.target.value);
  }
  const handleNewAnswerB = (event) => {
    setAnswerB(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let topicId = Math.random().toString(32).substring(2);
    if (topic === "" || answerA === "" || answerB === "") {
      console.log("回答されていない箇所があります");
      return
    }
    set(ref(db, 'topics/' + topicId), {
        topicId: topicId,
        topicText: topic,
        topicAnswerA: answerA,
        topicAnswerB: answerB,
      },
    );
    setTopic("");
    setAnswerA("");
    setAnswerB("");
  }

  // データの一覧表示
  useEffect(() => {
    const topicRef = ref(db, 'topics/');
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

  // データの削除
  const handleRemove = (topicId) => {
    remove(ref(db, 'topics/' + topicId));
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          お題：
          <input type="text" value={ topic } placeholder="お題を記入"
            onChange={handleNewTopic} />
        </label><br/>
        <label>
            回答A：
            <input type="text" value={ answerA } placeholder="回答Aを記入"
              onChange={handleNewAnswerA} />
        </label><br/>
        <label>
            回答B：
            <input type="text" value={ answerB } placeholder="回答Bを記入"
              onChange={handleNewAnswerB} />
        </label><br/>
        <button type="submit">送信</button>
      </form>
      <p></p><br/>
      <h2>お題と回答一覧</h2><br/>
      {
        topics.map((topic) => (
          <div key={topic.topicId}>
            <ul>
              <li>お題：{topic.topicText}</li>
              <li>回答A：{topic.topicAnswerA}</li>
              <li>回答B：{topic.topicAnswerB}</li>
            </ul>
            <button onClick={() => {
              handleRemove(topic.topicId);
            }} type="submit">削除</button>
            <p></p><br/>
          </div>
        ))
      }
    </div>
  );
};

export default AdminPage;
