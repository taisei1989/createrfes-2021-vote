import { update, onValue, ref, off } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";

const ModeratorTimer = ({ phase }) => {
  const [count, setCount] = useState(10);

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
    if (count === 0) {
      const phaseData = {
        phase: PHASES.TALLY,
      };
      const updates = {};
      updates["/progress/"] = phaseData;
      update(ref(db), updates);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  console.log(count);

  return <div>{count}</div>;
};

export default ModeratorTimer;
