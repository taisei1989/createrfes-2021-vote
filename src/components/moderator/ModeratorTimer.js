import { update, ref, get } from "@firebase/database";
import { useEffect, useRef, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import { CSSTransition } from "react-transition-group";
import { COUNT } from "../../configs";
import { IS_DEBUG } from "../../configs";

import styles from "./ModeratorCommon.module.scss";

const isDebug = IS_DEBUG && true;

const ModeratorTimer = ({ phase }) => {
  const [count, setCount] = useState(COUNT);
  const showNum = phase === PHASES.VOTE;
  const showCount = phase === PHASES.VOTE;
  const elementRef = useRef(null);

  useEffect(() => {
    // VOTEフェーズの開始時にカウントを初期化
    if (phase === PHASES.VOTE) {
      setCount(COUNT);
    }

    // VOTEフェーズに移った際にカウントのデータを一度だけ取得
    const timerRef = ref(db, "timer/count");
    get(timerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCount(snapshot.val());

          if (isDebug) console.log(`カウント: ${snapshot.val()}`);
        }
      })
      .catch((error) => {
        if (isDebug) console.error(error);
      });
  }, [phase]);

  useEffect(() => {
    // データベースのtimer/countを毎秒更新
    const postData = {
      count: count,
    };
    const updates = {};
    updates["/timer/"] = postData;
    update(ref(db), updates);

    // カウントが0以上のとき毎秒カウントが１ずつ更新される
    if (phase === PHASES.VOTE && count > 0) {
      let updatedCount = count - 1;
      let intervalId = setInterval(() => {
        setCount(updatedCount);

        if (isDebug) console.log("setIntervalを実行しました");
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [count, phase]);

  return (
    <CSSTransition
      in={showCount}
      nodeRef={elementRef}
      timeout={3000}
      classNames={{
        enter: styles.countEnter,
        enterActive: styles.countEnterActive,
        enterDone: styles.countEnterDone,
        exit: styles.countExit,
        exitActive: styles.countExitActive,
        exitDone: styles.countExitDone,
      }}
    >
      <div className={styles.moderatorTimer} ref={elementRef}>
        <img src={"images/moderator/count-bg.png"} alt="カウントダウン用画像" />
        {showNum && <p>{count}</p>}
      </div>
    </CSSTransition>
  );
};

export default ModeratorTimer;
