import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../interfaces";
import * as CONF from "../configs";
import TopicAnswerPanel from "../components/moderator/TopicAnswerPanel";
import styles from "./ModeratorPage.module.scss";
import TopicResult from "../components/moderator/TopicResult";
import GuideView from "../components/moderator/GuideView";
import PreparePage from "../components/moderator/PreparePage";
import GoodBadPanel from "../components/moderator/GoodBadPanel";
import ModeratorTimer from "../components/moderator/ModeratorTimer";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;
const isDebugPhase = CONF.IS_DEBUG && false;
const isNotDebugPhase = !isDebugPhase;
const phaseInitial = isDebugPhase ? PHASES.COUNT : PHASES.GUIDE;

/**
 * 司会者ページ
 * データベースからデータを取得する責務を負う
 */
const ModeratorPage = () => {
  const [phase, setPhase] = useState(phaseInitial);

  useEffect(() => {
    const db = getDatabase();
    const refProgress = ref(db, "progress/");

    const unsubscribe = onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug) console.log("フェーズの切り替えを検知", { phaseUpdated });

      // nullチェック
      if (phaseUpdated) {
        // 適応する
        if (isNotDebugPhase) {
          setPhase(phaseUpdated);
        }
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
      <GuideView phase={phase} />

      <div className={styles.display}>
        <TopicResult phase={phase} />
        <div>回転するwakayamaくん</div>
        <GoodBadPanel phase={phase} />
        <p>投票画面はこちら↓</p>
        <img
          src={`${process.env.PUBLIC_URL}/creater-fes-QR.png`}
          alt="createrfes-vote-QR"
        />
      </div>
    </div>
  );
  // } else if (phase === PHASES.VOTE) {
  //   return (
  //     <div className={styles.display}>
  //       <PreparePage phase={phase} />
  //       <TopicAnswerPanel phase={phase} />
  //       <ModeratorTimer phase={phase} />
  //       <div>回転するwakayamaくん</div>
  //       <GoodBadPanel phase={phase} />
  //       <p>投票画面はこちら↓</p>
  //       <img
  //         src={`${process.env.PUBLIC_URL}/creater-fes-QR.png`}
  //         alt="createrfes-vote-QR"
  //       />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className={styles.display}>
  //       <PreparePage phase={phase} />
  //       <TopicAnswerPanel phase={phase} />
  //       <div>回転するwakayamaくん</div>
  //       <GoodBadPanel phase={phase} />
  //       <p>投票画面はこちら↓</p>
  //       <img
  //         src={`${process.env.PUBLIC_URL}/creater-fes-QR.png`}
  //         alt="createrfes-vote-QR"
  //       />
  //     </div>
  //   );
  // }
};

export default ModeratorPage;
