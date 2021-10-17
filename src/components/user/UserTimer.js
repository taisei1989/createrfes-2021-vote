import { onValue, ref, off } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";

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
      //console.log("setInterval を実行しました");
    }, 1000);
    return clearInterval(intervalId);
  }, [count]);

  console.log(count);

  if (phase === PHASES.VOTE) {
    return <div>{count}</div>;
  }
  return null;
};

export default UserTimer;
