import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

import { db } from "../services/firebase";
import { PHASES } from "../interfaces";
import * as CONF from "../configs";
import UserPreparationView from "../components/user/UserPreparationView";
import styles from "./UserPage.module.scss";
import Buttons from "../components/user/Buttons";
import UserTimer from "../components/user/UserTimer";
import TallyVotes from "../components/user/TallyVotes";
import ResultDisplay from "../components/user/ResultDisplay";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;

/**
 * ユーザーページ
 * （このページに持たせる責任）
 */

const UserPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);
  const [currentTopic, setCurrentTopicText] = useState({
    text: "",
    answerA: "",
    answerB: "",
  });

  useEffect(() => {
    const refProgress = ref(db, "progress/");
    const currentTopicRef = ref(db, "current/");

    const unsubscribePhase = onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug)
        console.log("フェーズの切り替えを検知しました", phaseUpdated);
      if (phaseUpdated) {
        setPhase(phaseUpdated);
      }
    });

    const unsubscribeCurrent = onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = {
        text: snapshot.val().currentTopicText,
        answerA: snapshot.val().currentAnswerA,
        answerB: snapshot.val().currentAnswerB,
      };

      // nullチェック
      if (currentTopicUpdated) {
        setCurrentTopicText({
          text: currentTopicUpdated.text,
          answerA: currentTopicUpdated.answerA,
          answerB: currentTopicUpdated.answerB,
        });
      }
    });

    return () => {
      unsubscribePhase();
      unsubscribeCurrent();
    };
  }, []);

  return (
    <div className={styles.userPage}>
      <img
        className={styles.mainVisual}
        src="images/user/main-visual.jpg"
        alt="createrfes-vote-title"
      />
      <UserPreparationView phase={phase} />

      <Buttons
        currentTopic={currentTopic.text}
        currentAnswerA={currentTopic.answerA}
        currentAnswerB={currentTopic.answerB}
        phase={phase}
      />

      <UserTimer phase={phase} />

      <TallyVotes phase={phase} />

      <ResultDisplay
        currentTopicText={currentTopic.text}
        currentAnswerA={currentTopic.answerA}
        currentAnswerB={currentTopic.answerB}
        phase={phase}
      />
    </div>
  );
};

export default UserPage;
