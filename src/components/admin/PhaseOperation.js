import { ref, update, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";

const PhaseOperation = () => {
  const [currentPhase, setCurrentPhase] = useState(PHASES.GUIDE);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timerRef = ref(db, "timer/count");
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data);
      if (data === 0) {
        console.log("0を検知しました");
        setCurrentPhase(PHASES.TALLY);
        return off(timerRef);
      }
    });
    return off(timerRef);
  }, [count]);

  useEffect(() => {
    const phaseData = {
      phase: currentPhase,
    };
    const updates = {};
    updates["/progress/"] = phaseData;
    update(ref(db), updates);
  }, [currentPhase]);

  return (
    <div>
      <h1>フェーズ切り替え</h1>
      <p>現在のフェーズ：{currentPhase}</p>
      <div>
        <label>準備フェーズ(preparing) </label>
        <button onClick={() => setCurrentPhase(PHASES.PREPARE)}>変更</button>
      </div>
      <div>
        <label>投票フェーズ(voting) </label>
        <button onClick={() => setCurrentPhase(PHASES.VOTE)}>変更</button>
      </div>
      <div>
        <label>集計フェーズ(tallying) </label>
        <button onClick={() => setCurrentPhase(PHASES.TALLY)}>変更</button>
      </div>
      <div>
        <label>結果発表フェーズ(resulting) </label>
        <button onClick={() => setCurrentPhase(PHASES.RESULT)}>変更</button>
      </div>
      <div>
        <label>開始前のガイドフェーズ(guiding) </label>
        <button onClick={() => setCurrentPhase(PHASES.GUIDE)}>変更</button>
      </div>
    </div>
  );
};

export default PhaseOperation;
