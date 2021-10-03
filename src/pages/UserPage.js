import React, { useEffect, useState } from "react";
import { ref, onDisconnect, onValue } from "firebase/database";

import { db } from "../services/firebase";
import { PHASES } from "../interfaces";
import * as CONF from "../config";
import { display } from "./userPages/components/paseChange";

// デバッグモードにするか。コンポーネントごとに設定できるよう記述
const isDebug = CONF.IS_DEBUG && true;

/**
 * ユーザーページ
 * （このページに持たせる責任）
 */

const UserPage = () => {
  const [phase, setPhase] = useState(PHASES.GUIDE);

  useEffect(() => {
    const refProgress = ref(db, "progress/");

    onValue(refProgress, (snapshot) => {
      const phaseUpdated = snapshot.val().phase;
      if (isDebug)
        console.log("フェーズの切り替えを検知しました", phaseUpdated);

      // nullチェック
      if (phaseUpdated) {
        setPhase(phaseUpdated);
      }
    });

    // コンポーネントがアクティブでなくなったらクリーンナップとして接続を解除する
    return () => {
      onDisconnect(refProgress);
    };
  }, []);

  return <div>{display(phase)}</div>;
};

export default UserPage;
