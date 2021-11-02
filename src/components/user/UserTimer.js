import { ref, onValue } from "@firebase/database";
import { useEffect, useState } from "react";
import { COUNT, IS_DEBUG } from "../../configs";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./UserCommon.module.scss";

const isDebug = IS_DEBUG && true;

const UserTimer = ({ phase }) => {
  const [count, setCount] = useState(COUNT);

  // データベースのカウントが変わる度にデータを取得し、カウントを表示
  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    const unsubscribeTime = onValue(timerRef, (snapshot) => {
      setCount(snapshot.val());

      if (isDebug) console.log(`カウントを${snapshot.val()}に更新しました`);
    });
    return () => {
      unsubscribeTime();
    };
  }, []);

  if (phase === PHASES.VOTE) {
    return (
      <div className={styles.guide}>
        <div className={styles.innerText}>あと{count}秒！</div>
      </div>
    );
  }
  return null;
};

export default UserTimer;
