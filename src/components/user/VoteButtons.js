import { child, push, ref, update } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import styles from "./VoteButtons.module.scss";
import { IS_DEBUG } from "../../configs";

const isDebug = IS_DEBUG && true;

const Buttons = ({ currentTopic, currentAnswerA, currentAnswerB, phase }) => {
  const [choiceAnswer, setChoiceAnswer] = useState(false);
  const [choiceAnswerKey, setchoiceAnswerKey] = useState("");

  // preparing phase に移った際にボタンの画像が初期化される処理
  useEffect(() => {
    if (phase === PHASES.PREPARE) {
      setChoiceAnswer(0);
    }
  }, [phase]);

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

  const buttonCheck = phase === PHASES.TALLY || phase === PHASES.RESULT;

  if (
    phase === PHASES.VOTE ||
    phase === PHASES.TALLY ||
    phase === PHASES.RESULT
  ) {
    return (
      <div>
        <p className={styles.title}>{currentTopic}</p>
        <div className={styles.buttonPanel}>
          <div className={styles.buttonPanelA}>
            <input
              type="radio"
              name="topicAnswer"
              id="topicAnswerA"
              className={styles.visuallyHidden}
              value={choiceAnswer}
              checked={choiceAnswer === "A"}
              onChange={() => setChoiceAnswer("A")}
              disabled={buttonCheck ? true : false}
            />
            <label htmlFor="topicAnswerA">
              {choiceAnswer === "A" ? (
                <img
                  src="images/user/button-a-selected.png"
                  alt="選択されたボタンA"
                />
              ) : (
                <img src="images/user/button-a.png" alt="ボタンA" />
              )}
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
              disabled={buttonCheck ? true : false}
            />
            <label htmlFor="topicAnswerB">
              {choiceAnswer === "B" ? (
                <img
                  src="images/user/button-b-selected.png"
                  alt="選択されたボタンB"
                />
              ) : (
                <img src="images/user/button-b.png" alt="ボタンB" />
              )}
              <p className={styles.topicAnswer}>{currentAnswerB}</p>
            </label>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Buttons;
