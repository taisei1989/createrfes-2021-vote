import React, { useEffect, useState } from "react";
import { ref, onDisconnect, onValue } from "firebase/database";

import { db } from "../services/firebase";
import { PHASES } from "../interfaces";
import * as CONF from "../config";
import PreparationPage from "./userPages/PreparationPage";
import VotePage from "./userPages/VotePage";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;

/**
 * ユーザーページ
 * （このページに持たせる責任）
 */

const UserPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);
  const [currentTopicText, setCurrentTopicText] = useState("");
  const [currentAnswerA, setCurrentAnswerA] = useState("");
  const [currentAnswerB, setCurrentAnswerB] = useState("");

  useEffect(() => {
    const refProgress = ref(db, "progress/");
    const currentTopicRef = ref(db, "current/");

    onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug)
        console.log("フェーズの切り替えを検知しました", phaseUpdated);
      if (phaseUpdated) {
        setPhase(phaseUpdated);
      }
    });

    onValue(currentTopicRef, (snapshot) => {
      const currentTopicTextUpdated = snapshot.val().currentTopicText;
      const currentAnswerAUpdated = snapshot.val().currentAnswerA;
      const currentAnswerBUpdated = snapshot.val().currentAnswerB;

      // nullチェック
      if (
        currentTopicTextUpdated &&
        currentAnswerAUpdated &&
        currentAnswerBUpdated
      ) {
        setCurrentTopicText(currentTopicTextUpdated);
        setCurrentAnswerA(currentAnswerAUpdated);
        setCurrentAnswerB(currentAnswerBUpdated);
      }
    });

    return () => {
      onDisconnect(refProgress);
    };
  }, []);

  return (
    <div>
      <PreparationPage phase={phase} />
      <VotePage
        phase={phase}
        currentTopicText={currentTopicText}
        currentAnswerA={currentAnswerA}
        currentAnswerB={currentAnswerB}
      />
    </div>
  );
};

export default UserPage;
