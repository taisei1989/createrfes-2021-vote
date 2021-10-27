import { update, onValue, ref } from "@firebase/database";
import { useEffect, useRef, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import { CSSTransition } from "react-transition-group";

import styles from "./ModeratorCommon.module.scss";

const ModeratorTimer = ({ phase }) => {
  const [count, setCount] = useState(60);
  const showNum = phase === PHASES.VOTE;
  const showCount = phase === PHASES.VOTE;
  const elementRef = useRef(null);

  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    const unsubscribeTime = onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
      console.log(data);
    });
    return () => {
      unsubscribeTime();
    };
  }, []);

  useEffect(() => {
    const postData = {
      count: count,
    };
    const updates = {};
    updates["/timer/"] = postData;
    update(ref(db), updates);
  }, [count]);

  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount(count - 1);
        console.log("setInterval を実行しました");
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    return null;
  }, [count]);

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
