import Countdown from "react-countdown";
import { PHASES } from "../../../interfaces";
import styles from "./Timer.module.scss";

/**
 * ユーザーから寄せられたGoodとBadを表示するパネル
 * カウントダウンのフェーズになった際、カウントダウンを表示する
 */
const Timer = ({ phase }) => {
  if (phase === PHASES.COUNT) {
    return (
      <div className={styles.timer}>
        <Countdown className={styles.countdown} date={Date.now() + 30000} />
      </div>
    );
  }
  return null;
};

export default Timer;
