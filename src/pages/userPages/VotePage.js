import React, { useEffect, useState } from "react";
import { ref, onValue, onDisconnect, set} from "firebase/database";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import PreparationPage from "./PreparationPage";

const VotePage = (phase) => {
  const [currentTopic, setCurrentTopic] = useState([]);
  const [choiceA, setchoiceA] = useState(false);
  const [choiceB, setchoiceB] = useState(false);
  const answerA = currentTopic[0];
  const answerB = currentTopic[1];
  const topicText = currentTopic[3];

  useEffect(() => {
    const currentTopicRef = ref(db, "current/");
    onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = Object.values(snapshot.val());
      // nullチェック
      if (currentTopicUpdated) {
        setCurrentTopic(currentTopicUpdated);
      }
    });
    setchoiceA(false);
    setchoiceB(false);
    return (
      onDisconnect(currentTopicRef)
    );
  }, []);

  const notChoice = () => {
    if (!choiceA && !choiceB){
      return(
        <div>
          <div>
            <label>{answerA}</label>
            <button onClick={() => setchoiceA(true)}>Aを選択する</button>
          </div>
          <div>
            <label>{answerB}</label>
            <button onClick={() => setchoiceB(true)}>Bを選択する</button>
          </div>
        </div>
      )
    }
  }

  const choiceAnswerA = () => {
    if (choiceA && !choiceB){
      return(
        <div>
          <div>
            <label>現在選択肢Aを選択しています：{answerA}</label>
          </div>
          <div>
            <label>{answerB}</label>
            <button onClick={() => {
              setchoiceB(true);
              setchoiceA(false);
            }}>Bに変更する</button>
          </div>
        </div>
      )
    }
  }

  const choiceAnswerB = () => {
    if (!choiceA && choiceB){
      return(
        <div>
          <div>
            <label>現在選択肢Bを選択しています：{answerB}</label>
          </div>
          <div>
            <label>{answerA}</label>
            <button onClick={() => {
              setchoiceB(false);
              setchoiceA(true);
            }}>Aに変更する</button>
          </div>
        </div>
      )
    }
  }

  if(phase.phase === PHASES.VOTE) {
    return (
      <div>
        <h1>VotePage</h1>
        <p>お題：{topicText}</p>
        {notChoice()}
        {choiceAnswerA()}
        {choiceAnswerB()}
        <p>投票してね！</p>
      </div>
    );
  } else if(phase.phase === PHASES.COUNT) {
      return (
        <div>
          <h1>VotePage</h1>
          <p>お題：{topicText}</p>
          {notChoice()}
          {choiceAnswerA()}
          {choiceAnswerB()}
        </div>
      );
  } else {
    return <PreparationPage phase={phase}/>
  }
};

export default VotePage;
