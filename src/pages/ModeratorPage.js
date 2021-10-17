import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../interfaces";
import * as CONF from "../configs";
import TopicAnswerPanel from "../components/moderator/TopicAnswerPanel";
import styles from "./ModeratorPage.module.scss";
import GuideView from "../components/moderator/GuideView";
import PreparePanel from "../components/moderator/PreparePanel";
import GoodBadPanel from "../components/moderator/GoodBadPanel";
import ModeratorTimer from "../components/moderator/ModeratorTimer";
import DebugModerator from "../components/moderator/DebugModerator";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;
const isDebugPhase = CONF.IS_DEBUG && true;

/**
 * 司会者ページ
 * データベースからデータを取得する責務を負う
 */
const ModeratorPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);

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
  return (
    <div className={styles.moderatorPage}>
      {isDebug && isDebugPhase && (
        <DebugModerator phase={phase} setPhase={setPhase} />
      )}

      <GuideView phase={phase} />

      <PreparePanel phase={phase} />

      <TopicAnswerPanel phase={phase} />

      <ModeratorTimer phase={phase} />

      <div>回転するwakayamaくん</div>

      <p>投票画面はこちらQR</p>

      <GoodBadPanel phase={phase} />
    </div>
  );
};

export default ModeratorPage;
