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

  // VOTEフェーズに移った際にカウントのデータを一度だけ取得
  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    get(timerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setCount(snapshot.val());

          if (isDebug) {
            console.log(`カウント: ${snapshot.val()}`);
          }
        }
      })
      .catch((error) => {
        if (isDebug) console.error(error);
      });
  }, []);

  useEffect(() => {
    if (phase === PHASES.VOTE) {
      setCount(COUNT);
    }
    const postData = {
      count: count,
    };
    const updates = {};
    updates["/timer/"] = postData;
    update(ref(db), updates);
  }, [count, phase]);

  useEffect(() => {
    if (phase === PHASES.VOTE && count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1);
        console.log("setInterval を実行しました");
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    return null;
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
