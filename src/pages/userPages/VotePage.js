import React from "react";
import { PHASES } from "../../interfaces";
import { Buttons } from "./components/Buttons";

const VotePage = ({
  phase,
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
}) => {
  if (phase === PHASES.VOTE) {
    return (
      <div>
        <img
          src="http://placehold.jp/400x150.png"
          alt="createrfes-vote-title"
        />
        <h2>{currentTopicText}</h2>
        <Buttons
          currentAnswerA={currentAnswerA}
          currentAnswerB={currentAnswerB}
        />
      </div>
    );
  }
  return null;
};

export default VotePage;
