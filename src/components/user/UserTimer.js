import { update, onValue, ref, off } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";

const UserTimer = ({ phase }) => {
  const [count, setCount] = useState(0);

  /* useEffect(() => {
    const timerRef = ref(db, "timer/count");
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
    return off(timerRef);
  }, []); */

  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
    });
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  console.log(count);

  if (phase === PHASES.VOTE) {
    return <div>{count}</div>;
  }
  return null;
};

export default UserTimer;
