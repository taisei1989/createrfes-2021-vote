import { child, push, ref, update } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import styles from "./Button.module.scss";
import Countdown from "react-countdown";

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

      return update(ref(db), updates);
    } else if (choiceAnswerKey) {
      const postData = {
        answer: choiceAnswer,
      };

      const updates = {};
      updates["/votes/" + choiceAnswerKey] = postData;

      return update(ref(db), updates);
    }
    return () => {
      console.log("コンポーネントがアンマウントしました");
    };
  }, [choiceAnswer, choiceAnswerKey]);

  // "$user_id": {
  //".validate": "newData.val() == 1 || newData.val() == 2"
  //}
  if (phase === PHASES.VOTE || phase === PHASES.COUNT) {
    return (
      <div>
        <div className={styles.topicAnswer}>
          <label htmlFor="topicAnswerA" className={styles.topicAnswerText}>
            {currentAnswerA}
            <input
              type="radio"
              name="topicAnswer"
              id="topicAnswerA"
              className={styles.topicAnswerButton}
              value={choiceAnswer}
              checked={choiceAnswer === "A"}
              onChange={() => setChoiceAnswer("A")}
            />
          </label>
        </div>
        <div className={styles.topicAnswer}>
          <label htmlFor="topicAnswerB" className={styles.topicAnswerText}>
            {currentAnswerB}
            <input
              type="radio"
              name="topicAnswer"
              id="topicAnswerB"
              className={styles.topicAnswerButton}
              value={choiceAnswer}
              checked={choiceAnswer === "B"}
              onChange={() => setChoiceAnswer("B")}
            />
          </label>
        </div>
        <div className={styles.timer}>
          <Countdown className={styles.countdown} date={Date.now() + 60000} />
        </div>
      </div>
    );
  }
  return null;
};

export default Buttons;
