import { child, push, ref, update } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../../../services/firebase";
import { PHASES } from "../../../interfaces";

export const Buttons = ({ currentAnswerA, currentAnswerB, phase }) => {
  const [choiceAnswer, setChoiceAnswer] = useState("");
  const [choiceAnswerKey, setchoiceAnswerKey] = useState("");

  /*   useEffect(() => {
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
  }, [choiceAnswer, choiceAnswerKey]); */

  // "$user_id": {
  //".validate": "newData.val() == 1 || newData.val() == 2"
  //}
  if (phase === PHASES.VOTE || phase === PHASES.COUNT) {
    return (
      <div>
        <label>{currentAnswerA}</label>
        <input
          type="radio"
          name="currentAnswerA"
          value={choiceAnswer}
          checked={choiceAnswer === "A"}
          onChange={() => setChoiceAnswer("A")}
        />
        <br />
        <label>{currentAnswerB}</label>
        <input
          type="radio"
          name="currentAnswerB"
          value={choiceAnswer}
          checked={choiceAnswer === "B"}
          onChange={() => setChoiceAnswer("B")}
        />
        <br />
      </div>
    );
  }
  return null;
};
