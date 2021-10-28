import { getDatabase, onValue, ref } from "@firebase/database";
import { useContext, useEffect, useState } from "react";
import { PHASES } from "../interfaces";
import * as CONF from "../configs";
import TopicAnswerPanel from "../components/moderator/TopicAnswerPanel";
import styles from "./ModeratorPage.module.scss";
import GuideView from "../components/moderator/GuideView";
import ModeratorPrepareView from "../components/moderator/ModeratorPrepareView";
import GoodBadPanel from "../components/moderator/GoodBadPanel";
import ModeratorTimer from "../components/moderator/ModeratorTimer";
import DebugModerator from "../components/moderator/DebugModerator";
import JudgeCharacter from "../components/moderator/JudgeCharacter";
import QRCodeBoard from "../components/moderator/QRCodeBoard";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && false;
const isDebugPhase = CONF.IS_DEBUG && false;

/**
 * 司会者ページ
 * データベースからデータを取得する責務を負う
 */
const ModeratorPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (isDebugPhase) return;

    const db = getDatabase();
    const refProgress = ref(db, "progress/");

    const unsubscribe = onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug) console.log("フェーズの切り替えを検知", { phaseUpdated });

      // nullチェック
      if (phaseUpdated) {
        // 適応する
        setPhase(phaseUpdated);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      unsubscribe();
    };
  }, []);

  // Render
  if (!user) {
    return <Redirect to="/moderator/login" />;
  }
  return (
    <div className={styles.moderatorPage}>
      {isDebug && isDebugPhase && (
        <DebugModerator phase={phase} setPhase={setPhase} />
      )}

      <GuideView phase={phase} />

      <ModeratorPrepareView phase={phase} />

      <TopicAnswerPanel phase={phase} />

      <ModeratorTimer phase={phase} />

      <JudgeCharacter phase={phase} />

      <QRCodeBoard phase={phase} />

      <GoodBadPanel phase={phase} />
    </div>
  );
};

export default ModeratorPage;
