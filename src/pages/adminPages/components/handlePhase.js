import { ref, update } from "firebase/database";
import { useState } from "react";
import { db } from "../../../services/firebase";

const HandlePhase = () => {
  const [currentPhase, setCurrentPhase] = useState("");
  
  const handleCurrentPhase = (phase) => {
    setCurrentPhase(phase);
    const phaseData = {
      "phase": currentPhase
    };
    const updates = {};
    updates['/progress/'] = phaseData;
    update(ref(db), updates);
  }

  return (
    <div>
      <h1>フェーズ切り替え</h1>
      <div>
        <label>準備フェーズ</label>
        <button onClick={() => handleCurrentPhase("preparing")}>変更</button>
      </div>
      <div>
        <label>投票フェーズ</label>
        <button onClick={() => handleCurrentPhase("voting")}>変更</button>
      </div>
      <div>
        <label>カウントダウンフェーズ</label>
        <button onClick={() => handleCurrentPhase("counting")}>変更</button>
      </div>
      <div>
        <label>集計フェーズ</label>
        <button onClick={() => handleCurrentPhase("tallying")}>変更</button>
      </div>
      <div>
        <label>結果発表フェーズ</label>
        <button onClick={() => handleCurrentPhase("resulting")}>変更</button>
      </div>
    </div>
  );
}

export default HandlePhase;