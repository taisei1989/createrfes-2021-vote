import { ref, update } from "firebase/database";
import { useState } from "react";
import { PHASES } from "../../../interfaces";
import { db } from "../../../services/firebase";

const HandlePhase = () => {
  const [currentPhase, setCurrentPhase] = useState(PHASES.GUIDE)

  const handleCurrentPhase = (phase) => {
    setCurrentPhase(phase);
    const phaseData = {
      phase: currentPhase,
    };
    const updates = {};
    updates["/progress/"] = phaseData;
    update(ref(db), updates);
  };

  return (
    <div>
      <h1>フェーズ切り替え</h1>
      <p>現在のフェーズ：{currentPhase}</p>
      <div>
        <label>準備フェーズ(preparing) </label>
        <button onClick={() => handleCurrentPhase(PHASES.PREPARE)}>変更</button>
      </div>
      <div>
        <label>投票フェーズ(voting) </label>
        <button onClick={() => handleCurrentPhase(PHASES.VOTE)}>変更</button>
      </div>
      <div>
        <label>カウントダウンフェーズ(counting) </label>
        <button onClick={() => handleCurrentPhase(PHASES.COUNT)}>変更</button>
      </div>
      <div>
        <label>集計フェーズ(tallying) </label>
        <button onClick={() => handleCurrentPhase(PHASES.TALLY)}>変更</button>
      </div>
      <div>
        <label>結果発表フェーズ(resulting) </label>
        <button onClick={() => handleCurrentPhase(PHASES.RESULT)}>変更</button>
      </div>
      <div>
        <label>開始前のガイドフェーズ(guiding) </label>
        <button onClick={() => handleCurrentPhase(PHASES.GUIDE)}>変更</button>
      </div>
    </div>
  );
};

export default HandlePhase;
