import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { PHASES } from "../../interfaces";
import styles from "./ModeratorCommon.module.scss";
import { IS_DEBUG } from "../../configs";

const isDebug = IS_DEBUG && true;

/**
 * フィードバックを描写するための処理
 */
class DrowFeedback {
  constructor(divElement) {
    this.pixiApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    });

    divElement.appendChild(this.pixiApp.view);
  }
}

/**
 * ユーザーから寄せられたGoodとBadを表示するパネル
 * 渡されたphaseに応じて、動作を変えたり、表示非表示をする責務を負う
 */
const GoodBadPanel = ({ phase }) => {
  const divElement = useRef(null);
  const [drowFeedback, setDrowFeedback] = useState(null);

  useEffect(() => {
    if (divElement.current) {
      if (drowFeedback === null) {
        if (isDebug) console.log("フィードバック描写用のクラスを初期化します");

        const drowFeedbackIns = new DrowFeedback(divElement.current);
        setDrowFeedback(drowFeedbackIns);
      }
    }
  }, [divElement, drowFeedback]);

  // PhaseがResultの時だけ表示
  const divStyle =
    phase === PHASES.RESULT ? { display: "block" } : { display: "none" };

  // render
  return (
    <div
      className={styles.goodBadPanel}
      style={divStyle}
      ref={divElement}
    ></div>
  );
};

export default GoodBadPanel;
