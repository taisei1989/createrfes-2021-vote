import React, { useContext, useEffect, useState } from "react";
import { ref, onValue, onDisconnect } from "firebase/database";
import { db } from "../services/firebase";
import { Redirect } from "react-router";

import Logout from "../components/admin/Logout";
import PhaseOperation from "../components/admin/PhaseOperation";
import { AuthContext } from "../contexts/AuthContext";
import AddTopic from "../components/admin/AddTopic";
import RemoveTopic from "../components/admin/RemoveTopic";
import { createVotesNode } from "../components/admin/createNewChildNode";
import { updatedCurrentTopic } from "../components/admin/updatedCurrentTopic";

const AdminPage = () => {
  const user = useContext(AuthContext);
  const [topic, setTopic] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [numOfVote, setnumOfVote] = useState({ a: 0, b: 0 });
  const [topics, setTopics] = useState([]);
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
    const topicRef = ref(db, "topics/");
    const currentTopicRef = ref(db, "current/");
    const voteRef = ref(db, "votes/");

    onValue(voteRef, (snapshot) => {
      const votesUpdated = Object.values(snapshot.val());

      // 集計結果
      let numOfVoteA = 0;
      let numOfVoteB = 0;

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVoteA++;
          } else if (answer === "B") {
            numOfVoteB++;
          } else {
            console.log("不明な投票を検知しました", answer);
          }
        }
      }

      // 反映する
      setnumOfVote({ a: numOfVoteA, b: numOfVoteB });
    });

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
        setCurrentTopic({
          topicId: currentTopicUpdated[2],
          topicText: currentTopicUpdated[3],
          topicAnswerA: currentTopicUpdated[0],
          topicAnswerB: currentTopicUpdated[1],
        });
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
          <li>ID：{currentTopic.topicId}</li>
          <li>お題：{currentTopic.topicText}</li>
          <li>投票A：{currentTopic.topicAnswerA}</li>
          <li>投票B：{currentTopic.topicAnswerB}</li>
          <li>投票結果A: {numOfVote.a}</li>
          <li>投票結果B: {numOfVote.b}</li>
        </ul>
        <br />
        <PhaseOperation />
        <br />
        <h2>お題設定</h2>
        <form
          onSubmit={(event) => {
            <AddTopic
              event={event}
              topic={topic}
              answerA={answerA}
              answerB={answerB}
            />;
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
            <RemoveTopic topic={topic} />
            <button
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
            <p></p>
            <br />
          </div>
        ))}
        <Logout />
      </div>
    );
  }
};

export default AdminPage;
