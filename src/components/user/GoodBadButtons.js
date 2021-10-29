import { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { FEEDBACKS } from "../../interfaces";
import styles from "./ResultDisplay.module.scss";

// 次のフィードバックが遅れるまでの時間
const durationCoolDown = 200;

const GoodBadButtons = () => {
  const [isCoolDown, setIsCoolDown] = useState(false);

  const db = getDatabase();
  const refFeedback = ref(db, "feedbacks/");

  const coolDown = () => {
    setIsCoolDown(true);

    window.setTimeout(() => {
      setIsCoolDown(false);
    }, durationCoolDown);
  };

  const handleGoodClick = (event) => {
    if (isCoolDown) return;

    push(refFeedback, FEEDBACKS.GOOD);
    coolDown();
  };

  const handleBadClick = (event) => {
    if (isCoolDown) return;

    push(refFeedback, FEEDBACKS.BAD);
    coolDown();
  };

  return (
    <div className={styles.feedbackPanel}>
      <div>
        <button id="goodPanel" onClick={handleGoodClick}></button>
        <label htmlFor="goodPanel">
          <img src="images/user/feedback-good.png" alt="feedback-good" />
        </label>
      </div>
      <div>
        <button id="badPanel" onClick={handleBadClick}></button>
        <label htmlFor="badPanel">
          <img src="images/user/feedback-bad.png" alt="feedback-bad" />
        </label>
      </div>
    </div>
  );
};

export default GoodBadButtons;
