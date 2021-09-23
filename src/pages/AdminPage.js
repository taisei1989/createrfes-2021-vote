import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../services/Firebase";

const AdminPage = () => {
  const [topic, setTopic] = useState({
    title: "",
    answerA: "",
    answerB: "",
  });

  const handleNewTopic = (event) => {
    console.log(event.target.value);
    setTopic({title: event.target.value});
  }
  const handleNewAnswerA = (event) => {
    console.log(event.target.value);
    setTopic({answerA: event.target.value});
  }
  const handleNewAnswerB = (event) => {
    console.log(event.target.value);
    setTopic({answerB: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let topicId = 1;
    if (topic === "") return
    set(ref(db, 'topics/' + topicId), {
      topicText: topic.title,
      answerA: topic.answerA,
      answerB: topic.answerB,
    });
  }
  
  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          タイトル：
          <input type="text" value={ topic.title } placeholder="お題のタイトルを記入"
            onChange={handleNewTopic} />
        </label><br/>
        <label>
          選択肢A：
          <input type="text" value={ topic.answerA } placeholder="選択肢Aを記入"
            onChange={handleNewAnswerA} />
        </label><br/>
        <label>
          選択肢B：
          <input type="text" value={ topic.answerB } placeholder="選択肢Bを記入"
            onChange={handleNewAnswerB} />
        </label>
      </form>
    </div>
  );
};

export default AdminPage;
