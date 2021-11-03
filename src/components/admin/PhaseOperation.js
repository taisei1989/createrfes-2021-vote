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
      <h3 className={styles.title}>フェーズ切り替え</h3>
      <p className={styles.currentPhase}>現在のフェーズ：{currentPhase}</p>
      <p className={styles.phaseName}>準備フェーズ(preparing) </p>
      <div>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.PREPARE)}
        >
          変更
        </button>
      </div>
      <p className={styles.phaseName}>投票フェーズ(voting) </p>
      <div>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.VOTE)}
        >
          変更
        </button>
      </div>
      <p className={styles.phaseName}>集計フェーズ(tallying) </p>
      <div>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.TALLY)}
        >
          変更
        </button>
      </div>
      <p className={styles.phaseName}>結果発表フェーズ(resulting) </p>
      <div>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.RESULT)}
        >
          変更
        </button>
      </div>
      <p className={styles.phaseName}>開始前のガイドフェーズ(guiding) </p>
      <div>
        <button
          className={styles.changePhaseButton}
          onClick={() => setCurrentPhase(PHASES.GUIDE)}
        >
          ガイド中
        </button>
      </div>
    </div>
  );
};

export default PhaseOperation;
