import React, { useEffect, useState } from "react";
import { ref, onValue, onDisconnect, set } from "firebase/database";
import { db } from "../../services/firebase";
import { PHASES } from "../../interfaces";
import PreparationPage from "./PreparationPage";

const VotePage = ({
  phase,
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
}) => {
  if (phase === PHASES.VOTE) {
    return (
      <div>
        {phase}
        <br />
        {currentTopicText}
        <br />
        {currentAnswerA}
        <br />
        {currentAnswerB}
      </div>
    );
  }
  return null;
};

export default VotePage;
