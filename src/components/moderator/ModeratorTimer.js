import { update, onValue, ref, off } from "@firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";

import styles from "./ModeratorCommon.module.scss";

const ModeratorTimer = ({ phase }) => {
  const [count, setCount] = useState(60);

  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
      console.log(data);
    });
    return off(timerRef);
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
    const intervalId = setInterval(() => {
      setCount(count - 1);
      console.log("setInterval を実行しました");
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  console.log(count);

  return (
    <div className={styles.moderatorTimer}>
      <p>{count}</p>
    </div>
  );
};

export default ModeratorTimer;
