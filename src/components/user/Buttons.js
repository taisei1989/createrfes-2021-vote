import { child, push, ref, update } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import styles from "./Button.module.scss";

const Buttons = ({ currentAnswerA, currentAnswerB, phase }) => {
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [choiceAnswerKey, setchoiceAnswerKey] = useState("");

  useEffect(() => {
    if (!choiceAnswerKey) {
      const postData = {
        answer: choiceAnswer,
      };

      const newPostKey = push(child(ref(db), "votes")).key;
      setchoiceAnswerKey(newPostKey);

      const updates = {};
      updates["/votes/" + newPostKey] = postData;

      update(ref(db), updates);
    } else if (choiceAnswerKey) {
      const postData = {
        answer: choiceAnswer,
      };

      const updates = {};
      updates["/votes/" + choiceAnswerKey] = postData;

      update(ref(db), updates);
    }
    return () => {
      console.log("コンポーネントがアンマウントしました");
    };
  }, [choiceAnswer, choiceAnswerKey]);

  if (phase === PHASES.VOTE) {
    return (
      <div className={styles.buttonPanel}>
        <div className={styles.buttonPanelA}>
          <input
            type="radio"
            name="topicAnswerA"
            id="topicAnswerA"
            className={styles.visuallyHidden}
            value={choiceAnswer}
            checked={choiceAnswer === "A"}
            onChange={() => setChoiceAnswer("A")}
          />
          <label htmlFor="topicAnswerA">
            <img src="/images/user/button-a.png" alt="createrfes-vote-title" />
            <p className={styles.topicAnswer}>{currentAnswerA}</p>
          </label>
        </div>
        <div className={styles.buttonPanelB}>
          <input
            type="radio"
            name="topicAnswer"
            id="topicAnswerB"
            value={choiceAnswer}
            checked={choiceAnswer === "B"}
            onChange={() => setChoiceAnswer("B")}
          />
          <label htmlFor="topicAnswerB">
            <img src="/images/user/button-b.png" alt="createrfes-vote-title" />
            <p className={styles.topicAnswer}>{currentAnswerB}</p>
          </label>
        </div>
      </div>
    );
  }
  return null;
};

export default Buttons;
