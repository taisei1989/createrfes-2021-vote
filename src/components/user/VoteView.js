import React from "react";
import { PHASES } from "../../interfaces";
import styles from "./VotePanel.module.scss";
import Buttons from "./Buttons";
import TallyVotes from "./TallyVotes";
import ResultDisplay from "./ResultDisplay";
import UserTimer from "./UserTimer";

const VoteView = ({
  phase,
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
}) => {
  if (
    phase === PHASES.VOTE ||
    phase === PHASES.TALLY ||
    phase === PHASES.RESULT
  ) {
    return (
      <div className={styles.display}>
        <div className={styles.topicAnswerPanel}>
          <img
            src={`${process.env.PUBLIC_URL}/main-visual.jpg`}
            className={styles.mainVisual}
            alt="createrfes-vote-title"
          />
          <h2 className={styles.topic}>{currentTopicText}</h2>
          <Buttons
            currentAnswerA={currentAnswerA}
            currentAnswerB={currentAnswerB}
            phase={phase}
          />
          <UserTimer phase={phase} />
          <TallyVotes
            currentAnswerA={currentAnswerA}
            currentAnswerB={currentAnswerB}
            phase={phase}
          />
          <ResultDisplay
            currentTopicText={currentTopicText}
            currentAnswerA={currentAnswerA}
            currentAnswerB={currentAnswerB}
            phase={phase}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default VoteView;
