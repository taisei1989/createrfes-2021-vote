import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../services/Firebase";

const AdminPage = () => {
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  
  const handleNewTopic = (event) => {
    console.log(event.target.value);
    setTopic(event.target.value);
  }
  const handleNewAnswerA = (event) => {
    console.log(event.target.value);
    setAnswerA(event.target.value);
  }
  const handleNewAnswerB = (event) => {
    console.log(event.target.value);
    setAnswerB(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // topicId は自動生成する
    let topicId = Math.random().toString(32).substring(2);
    if (topic === "" || answerA === "" || answerB === "") {
      console.log("回答されていない箇所があります");
      return
    }
    set(ref(db, 'topics/' + topicId), {
      topicText: topic,
      topicAnswerA: answerA,
      topicAnswerB: answerB,
    });
  }
  
  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル：
          <input type="text" value={ topic } placeholder="お題のタイトルを記入"
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
    </div>
  );
};

export default AdminPage;
