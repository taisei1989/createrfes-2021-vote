import { getDatabase, onDisconnect, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../interfaces";
import GoodBadPanel from "./moderator/GoodBadPanel";
import * as CONF from "../config";
import TopicAnswerPanel from "./moderator/TopicAnswerPanel";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;

/**
 * 司会者ページ
 * データベースからデータを取得する責務を負う
 */
const ModeratorPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);

  useEffect(() => {
    const db = getDatabase();
    const refProgress = ref(db, "progress/");

    onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug)
        console.log("フェーズの切り替えを検知しました", phaseUpdated);

      // nullチェック
      if (phaseUpdated) {
        // 適応する
        setPhase(phaseUpdated);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      onDisconnect(refProgress);
    };
  }, []);

  console.log(phase);

  // Render
  return (
    <div>
      <h1>Moderator Page</h1>
      {phase}
      <TopicAnswerPanel />
      <div>回転するwakayamaくん</div>
      <GoodBadPanel phase={phase} />
    </div>
  );
};

export default ModeratorPage;
