import React, { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../services/Firebase";

const AdminPage = () => {
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [data, setData] = useState([]);

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
        topicText: topic,
        topicAnswerA: answerA,
        topicAnswerB: answerB,
      },
    );
    setTopic("");
    setAnswerA("");
    setAnswerB("");
  }

  useEffect(() => {
    const topicRef = ref(db, 'topics/');
    onValue(topicRef, (snapshot) => {
      const data = Object.values(snapshot.val());
      setData(data);
    });
  }, []);

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
      <h2>お題と回答一覧</h2>
      {data.map((data) => (
        <ul>
          <li>お題：{data.topicText}</li>
          <li>回答A：{data.topicAnswerA}</li>
          <li>回答B：{data.topicAnswerB}</li>
        </ul>
      ))}
    </div>
  );
};

export default AdminPage;
