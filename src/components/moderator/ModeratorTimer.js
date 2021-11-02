import { update, ref, onValue } from "@firebase/database";
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
    const timerRef = ref(db, "timer/count");

    const unsubscribeTime = onValue(timerRef, (snapshot) => {
      let data = snapshot.val();
      setCount(data);
      if (isDebug) console.log(`カウント${data}を取得しました`);
    });
    return () => {
      unsubscribeTime();
    };
  }, []);

  useEffect(() => {
    if (phase === PHASES.VOTE) {
      setCount(COUNT);
    }

    // データベースのtimer/countを毎秒更新
    const postData = {
      count: count,
    };
    const updates = {};
    updates["/timer/"] = postData;
    update(ref(db), updates);

    // カウントが0以上のとき毎秒カウントが１ずつ更新される
    if (phase === PHASES.VOTE && count > 0) {
      const intervalId = setInterval(() => {
        let updatedCount = count - 1;
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
