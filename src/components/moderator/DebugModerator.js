import { PHASES } from "../../interfaces.js";
import styles from "./ModeratorCommon.module.scss";

const DebugModerator = ({ phase, setPhase }) => {
  const handleClick = (phase) => {
    setPhase(phase);
  };

  return (
    <div className={styles.debugModerator}>
      <h1>DebugModerator</h1>
      <p>Phase: {phase}</p>
      <button onClick={() => handleClick(PHASES.GUIDE)}>GUIDE</button>
      <button onClick={() => handleClick(PHASES.PREPARE)}>PREPARE</button>
      <button onClick={() => handleClick(PHASES.VOTE)}>VOTE</button>
      <button onClick={() => handleClick(PHASES.TALLY)}>TALLY</button>
      <button onClick={() => handleClick(PHASES.RESULT)}>RESULT</button>
    </div>
  );
};

export default DebugModerator;
