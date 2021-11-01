import { onValue, ref, get } from "@firebase/database";
import { useEffect, useState } from "react";
import { IS_DEBUG } from "../../configs";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./UserCommon.module.scss";

const isDebug = IS_DEBUG && true;

const UserTimer = ({ phase }) => {
  const [count, setCount] = useState(0);

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
    /* const unsubscribeTime = onValue(timerRef, (snapshot) => {
      setCount(snapshot.val());
      console.log("カウントを更新しました");
    });
    return () => {
      unsubscribeTime();
    }; */
  }, []);

  useEffect(() => {
    if (phase === PHASES.VOTE && count > 0) {
      let updatedCount = count - 1;
      let intervalID = window.setInterval(() => {
        setCount(updatedCount);
      }, 1000);

      if (isDebug) console.log("カウントが更新されました");

      return () => {
        clearInterval(intervalID);
      };
    }
  }, [count, phase]);

  console.log(count);

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
