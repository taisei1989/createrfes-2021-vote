import { ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";
import styles from "../../pages/AdminPage.module.scss";

const PhaseOperation = () => {
  const [currentPhase, setCurrentPhase] = useState(PHASES.GUIDE);

  useEffect(() => {
    const phaseData = {
      phase: currentPhase,
    };
    const updates = {};
    updates["/progress/"] = phaseData;
    update(ref(db), updates);
  }, [currentPhase]);

  return (
    <div className={styles.handlePhase}>
      <h3>フェーズ切り替え</h3>
      <div className={styles.currentPhase}>
        <p>現在のフェーズ：{currentPhase}</p>
      </div>
      <div>
        <label>開始前のガイドフェーズ(guiding) </label>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.GUIDE)}
        >
          変更
        </button>
      </div>
      <div>
        <label>準備フェーズ(preparing) </label>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.PREPARE)}
        >
          変更
        </button>
      </div>
      <div>
        <label>投票フェーズ(voting) </label>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.VOTE)}
        >
          変更
        </button>
      </div>
      <div>
        <label>集計フェーズ(tallying) </label>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.TALLY)}
        >
          変更
        </button>
      </div>
      <div>
        <label>結果発表フェーズ(resulting) </label>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.RESULT)}
        >
          変更
        </button>
      </div>
    </div>
  );
};

export default PhaseOperation;
