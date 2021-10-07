import { onDisconnect, onValue, ref } from "@firebase/database";
import { useState } from "react/cjs/react.development";
import { PHASES } from "../../../interfaces";
import { db } from "../../../services/firebase";

/**
 * ユーザーの回答を集計する
 * 投票数の集計とその結果を保持し表示する責務を負う
 */
const CountVotes = ({ currentAnswerA, currentAnswerB, phase }) => {
  if (phase === PHASES.TALLY) {
    return (
      <div>
        <p>{currentAnswerA}: ???</p>
        <p>{currentAnswerB}: ???</p>
        <p>集計中</p>
      </div>
    );
  }
  return null;
};

export default CountVotes;
