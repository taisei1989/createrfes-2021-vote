import React from "react";
import { PHASES } from "../../interfaces";
import { Buttons } from "./components/Buttons";
import CountVotes from "./components/CountVotes";
import ResultDisplay from "./components/ResultDisplay";
import Timer from "./components/Timer";

const VotePage = ({
  phase,
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
}) => {
  if (
    phase === PHASES.VOTE ||
    phase === PHASES.COUNT ||
    phase === PHASES.TALLY ||
    phase === PHASES.RESULT
  ) {
    return (
      <div>
        <img
          src="http://placehold.jp/400x150.png"
          alt="createrfes-vote-title"
        />
        <h2>お題：{currentTopicText}</h2>
        <Buttons
          currentAnswerA={currentAnswerA}
          currentAnswerB={currentAnswerB}
          phase={phase}
        />
        <Timer phase={phase} />
        <CountVotes
          currentAnswerA={currentAnswerA}
          currentAnswerB={currentAnswerB}
          phase={phase}
        />
        <ResultDisplay
          currentAnswerA={currentAnswerA}
          currentAnswerB={currentAnswerB}
          phase={phase}
        />
      </div>
    );
  }
  return null;
};

export default VotePage;
