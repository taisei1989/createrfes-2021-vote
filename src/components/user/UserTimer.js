import { ref, get } from "@firebase/database";
import { useEffect, useState } from "react";
import { COUNT, IS_DEBUG } from "../../configs";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./UserCommon.module.scss";

const isDebug = IS_DEBUG && false;

const UserTimer = ({ phase }) => {
  const [count, setCount] = useState(COUNT);

  // VOTEフェーズに移った際にカウントのデータを一度だけ取得
  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    get(timerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCount(snapshot.val());

          if (isDebug) console.log(`count: ${snapshot.val()} を取得しました`);
        }
      })
      .catch((error) => {
        if (isDebug) console.error(error);
      });
  }, [phase]);

  // カウントが0以上のとき毎秒カウントが１ずつ更新される
  useEffect(() => {
    if (phase === PHASES.VOTE && count > 0) {
      let updatedCount = count - 1;
      let intervalID = window.setInterval(() => {
        setCount(updatedCount);
      }, 1000);

      if (isDebug) {
        console.log("setIntervalを実行しました");
        console.log(`現在のカウント: ${count}`);
      }
      return () => {
        clearInterval(intervalID);
      };
    }
  }, [count, phase]);

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
