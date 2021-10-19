import { onValue, ref, off } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "./UserCommon.module.scss";

const UserTimer = ({ phase }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    onValue(timerRef, (snapshot) => {
      setCount(snapshot.val());
    });
    return () => {
      off(timerRef);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

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
