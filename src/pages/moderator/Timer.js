import Countdown from "react-countdown";
import { PHASES } from "../../interfaces";

/**
 * ユーザーから寄せられたGoodとBadを表示するパネル
 * カウントダウンのフェーズになった際、カウントダウンを表示する
 */
const Timer = ({ phase }) => {
  if (phase === PHASES.COUNT) {
    return (
      <div className="good-bad-panel">
        <Countdown date={Date.now() + 60000} />
      </div>
    );
  }
  return null;
};

export default Timer;
