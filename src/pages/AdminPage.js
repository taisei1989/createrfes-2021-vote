import React, { useEffect, useState } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "../services/Firebase";

const AdminPage = () => {
  
  // データの追加
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState([]);

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

  // TODO: 現在のお題へ設定する
  const handleCurrentTopic = (topic) => {
    setCurrentTopic(topic);
    console.log(currentTopic);
  }

  return (
    <div>
      <h2>現在のお題</h2>
      <ul>
        <li>ID：{currentTopic.topicId}</li>
        <li>お題：{currentTopic.topicText}</li>
        <li>投票A：{currentTopic.topicAnswerA}</li>
        <li>投票B：{currentTopic.topicAnswerB}</li>
      </ul>
      <br/><h2>お題設定</h2>
      <form onSubmit={handleSubmit}>
        <label>
          お題：
          <input type="text" value={ topic } placeholder="お題を記入"
            onChange={handleNewTopic} />
        </label><br/>
        <label>
            投票A：
            <input type="text" value={ answerA } placeholder="投票Aを記入"
              onChange={handleNewAnswerA} />
        </label><br/>
        <label>
            投票B：
            <input type="text" value={ answerB } placeholder="投票Bを記入"
              onChange={handleNewAnswerB} />
        </label><br/>
        <button type="submit">送信</button>
      </form>
      <br/><h2>お題と回答一覧</h2>
      {
        topics.map((topic) => (
          <div key={topic.topicId}>
            <ul>
              <li>ID：{topic.topicId}</li>
              <li>お題：{topic.topicText}</li>
              <li>投票A：{topic.topicAnswerA}</li>
              <li>投票B：{topic.topicAnswerB}</li>
            </ul>
            <button onClick={() => {
              handleRemove(topic.topicId);
            }} type="submit">削除</button>
            <button onClick={() => {
              handleCurrentTopic(topic);
            }}>現在のお題に設定</button>
            <p></p><br/>
          </div>
        ))
      }
    </div>
  );
};

export default AdminPage;
