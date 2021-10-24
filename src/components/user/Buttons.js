import { child, off, push, ref, update } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import styles from "./Buttons.module.scss";

const Buttons = ({ currentTopic, currentAnswerA, currentAnswerB, phase }) => {
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
      off(ref(db));
      console.log("コンポーネントがアンマウントしました");
    };
  }, [choiceAnswer, choiceAnswerKey]);

  if (phase === PHASES.VOTE) {
    return (
      <div>
        <p className={styles.title}>{currentTopic}</p>
        <div className={styles.buttonPanel}>
          <form name="voteForm" action="">
            <div className={styles.buttonPanelA}>
              <input
                type="radio"
                name="topicAnswer"
                id="topicAnswerA"
                className={styles.visuallyHidden}
                value={choiceAnswer}
                checked={choiceAnswer === "A"}
                onChange={() => setChoiceAnswer("A")}
              />
              <label htmlFor="topicAnswerA">
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
                <p className={styles.topicAnswer}>{currentAnswerB}</p>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (phase === PHASES.TALLY || phase === PHASES.RESULT) {
    return (
      <div>
        <p className={styles.title}>{currentTopic}</p>
        <div className={styles.buttonPanel}>
          <form name="voteForm" action="">
            <div className={styles.buttonPanelA}>
              <input
                type="radio"
                name="topicAnswer"
                id="topicAnswerA"
                className={styles.visuallyHidden}
                value={choiceAnswer}
                disabled="disabled"
                checked={choiceAnswer === "A"}
                onChange={() => setChoiceAnswer("A")}
              />
              <label htmlFor="topicAnswerA">
                <p className={styles.topicAnswer}>{currentAnswerA}</p>
              </label>
            </div>
            <div className={styles.buttonPanelB}>
              <input
                type="radio"
                name="topicAnswer"
                id="topicAnswerB"
                value={choiceAnswer}
                disabled="disabled"
                checked={choiceAnswer === "B"}
                onChange={() => setChoiceAnswer("B")}
              />
              <label htmlFor="topicAnswerB">
                <p className={styles.topicAnswer}>{currentAnswerB}</p>
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

export default Buttons;
