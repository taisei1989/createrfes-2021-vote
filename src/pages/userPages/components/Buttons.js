import { child, get, push, ref, set, update } from "@firebase/database";
import React, { useState } from "react";
import { db } from "../../../services/firebase";

export const Buttons = ({ currentAnswerA, currentAnswerB }) => {
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [answerKey, setAnswerKey] = useState("");

  const changeAnswer = () => {
    if (!answerKey) {
      const postData = {
        answer: choiceAnswer,
      };

      const newPostKey = push(child(ref(db), "votes")).key;
      setAnswerKey(newPostKey);

      const updates = {};
      updates["/votes/" + newPostKey] = postData;

      return update(ref(db), updates);
    } else if (answerKey) {
      const postData = {
        answer: choiceAnswer,
      };

      const updates = {};
      updates["/votes/" + answerKey] = postData;

      return update(ref(db), updates);
    }
  };

  // "$user_id": {
  //".validate": "newData.val() == 1 || newData.val() == 2"
  //}
  return (
    <div>
      <label>{currentAnswerA}</label>
      <input
        type="radio"
        name="currentAnswerA"
        value={choiceAnswer}
        checked={choiceAnswer === "A"}
        onChange={async () => {
          await changeAnswer();
          setChoiceAnswer("A");
        }}
      />
      <br />
      <label>{currentAnswerB}</label>
      <input
        type="radio"
        name="currentAnswerB"
        value={choiceAnswer}
        checked={choiceAnswer === "B"}
        onChange={async () => {
          await changeAnswer();
          setChoiceAnswer("B");
        }}
      />
      <br />
    </div>
  );
};
