import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { PHASES } from "../../interfaces";
import styles from "./ModeratorCommon.module.scss";
import { IS_DEBUG } from "../../configs";

const isDebug = IS_DEBUG && true;

const numOfParticles = 10;
const numOfMaxParticles = 500;

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

    // エレメントにアタッチする
    divElement.appendChild(this.pixiApp.view);

    this.goodParticles = new PIXI.ParticleContainer(numOfMaxParticles, {
      alpha: true,
    });
    this.badParticles = new PIXI.ParticleContainer(numOfMaxParticles, {
      alpha: true,
    });

    this.pixiApp.stage.addChild(this.goodParticles);
    this.pixiApp.stage.addChild(this.badParticles);

    this.pixiApp.loader.add("good", "./images/moderator/fb-good.png");
    this.pixiApp.loader.add("bad", "./images/moderator/fb-bad.png");

    this.pixiApp.loader.load(() => {
      this.isLoaded = true;
      this.init();
    });
  }

  /**
   * リソースのロード後、初期化する
   */
  init() {
    const goodTexture = this.pixiApp.loader.resources["good"].texture;
    const badTexture = this.pixiApp.loader.resources["bad"].texture;

    for (let i = 0; i < numOfParticles; i++) {
      const goodSprite = new PIXI.Sprite(goodTexture);
      const badSprite = new PIXI.Sprite(badTexture);

      goodSprite.anchor.set(0.5);
      badSprite.anchor.set(0.5);

      goodSprite.position.x = Math.random() * window.innerWidth;
      goodSprite.position.y = Math.random() * window.innerHeight;
      badSprite.position.x = Math.random() * window.innerWidth;
      badSprite.position.y = Math.random() * window.innerHeight;

      this.goodParticles.addChild(goodSprite);
      this.badParticles.addChild(badSprite);
    }
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
