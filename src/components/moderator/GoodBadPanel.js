import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import * as PIXI from "pixi.js";
import { FEEDBACKS, PHASES } from "../../interfaces";
import styles from "./ModeratorCommon.module.scss";
import { IS_DEBUG } from "../../configs";

const isDebug = IS_DEBUG && false;

const numOfParticles = 10;
const numOfMaxParticles = 500;

const decreaseAlpha = 0.01;

const loadInterval = 1000;

function decreaseSpriteAlpha(sprite, alpha) {
  sprite.alpha -= alpha;

  if (sprite.alpha <= 0) {
    sprite.alpha = 0;
    sprite.visible = false;
  }
}

function showSprite(sprite) {
  sprite.visible = true;
  sprite.alpha = 1;
  sprite.position.x = Math.random() * window.innerWidth;
  sprite.position.y = Math.random() * window.innerHeight;
}

/**
 * フィードバックを描写するための処理
 */
class DrowFeedback {
  constructor(divElement) {
    this.isUpdate = false;
    this.isShow = false;
    this.isLoad = false;

    this.goodParticlesPerSecond = 2;
    this.goodParticlesReady = 0;
    this.goodParticlesIndex = 0;

    this.badParticlesPerSecond = 1;
    this.badParticlesReady = 0;
    this.badParticlesIndex = 0;

    this.tempNumOfGood = 0;
    this.tempNumOfBad = 0;

    // pixi app
    this.pixiApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundAlpha: 0,
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
      this.init();
      this.isInit = true;
    });

    // setup Database
    const db = getDatabase();
    this.refFeedback = ref(db, "feedbacks/");

    this.intervalTimer = window.setInterval(
      this.loadFeedback.bind(this),
      loadInterval
    );
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

    // Tickerに登録する
    this.pixiApp.ticker.maxFPS = 10;
    this.pixiApp.ticker.add(this.update, this);

    this.isUpdate = true;
  }

  /**
   * 描写をアップデートする
   */
  update(delta) {
    if (!this.isInit) return;
    if (!this.isUpdate) return;

    // スプライトを透明にするアニメーション
    const alpha = decreaseAlpha * delta;

    this.goodParticles.children.forEach((sprite) => {
      if (sprite.visible) {
        decreaseSpriteAlpha(sprite, alpha);
      }
    });

    this.badParticles.children.forEach((sprite) => {
      if (sprite.visible) {
        decreaseSpriteAlpha(sprite, alpha);
      }
    });

    // フィードバック数に応じてスプライトを表示する
    if (this.isShow) {
      const particleDeltaMS = this.pixiApp.ticker.deltaMS * 0.001;

      this.goodParticlesReady += this.goodParticlesPerSecond * particleDeltaMS;
      this.badParticlesReady += this.badParticlesPerSecond * particleDeltaMS;

      const goodParticlesToShow = Math.floor(this.goodParticlesReady);
      const badParticlesToShow = Math.floor(this.badParticlesReady);

      this.goodParticlesReady -= goodParticlesToShow;
      this.badParticlesReady -= badParticlesToShow;

      for (let i = 0; i < goodParticlesToShow; i++) {
        const goodSprite = this.goodParticles.getChildAt(
          this.goodParticlesIndex
        );
        showSprite(goodSprite);

        this.goodParticlesIndex++;
        if (this.goodParticlesIndex >= this.goodParticles.children.length) {
          this.goodParticlesIndex = 0;
        }
      }

      for (let i = 0; i < badParticlesToShow; i++) {
        const badSprite = this.badParticles.getChildAt(this.badParticlesIndex);
        showSprite(badSprite);

        this.badParticlesIndex++;
        if (this.badParticlesIndex >= this.badParticles.children.length) {
          this.badParticlesIndex = 0;
        }
      }
    }
  }

  /**
   * 一定期間ごとにフィードバックを取得し、rateを設定する
   */
  loadFeedback() {
    if (!this.isInit) return;
    if (!this.isLoad) return;

    // フィードバックを取得する
    get(this.refFeedback)
      .then((snapshot) => {
        const feedbacks = snapshot.val();

        if (feedbacks) {
          const feedbacksValues = Object.values(feedbacks);

          let numOfGood = 0;
          let numOfBad = 0;

          for (let i = 0; i < feedbacksValues.length; i++) {
            if (feedbacksValues[i] === FEEDBACKS.GOOD) {
              numOfGood++;
            } else if (feedbacksValues[i] === FEEDBACKS.BAD) {
              numOfBad++;
            }
          }

          const numOfCreaseGood = numOfGood - this.tempNumOfGood;
          const numOfCreaseBad = numOfBad - this.tempNumOfBad;

          this.goodParticlesPerSecond = (numOfCreaseGood / loadInterval) * 1000;
          this.badParticlesPerSecond = (numOfCreaseBad / loadInterval) * 1000;

          this.tempNumOfGood = numOfGood;
          this.tempNumOfBad = numOfBad;

          if (isDebug)
            console.log(
              `good: ${this.goodParticlesPerSecond}, bad: ${this.badParticlesPerSecond}`
            );
        }
      })
      .catch((error) => {
        if (isDebug) console.error(error);
      });
  }

  /**
   * フィードバックを表示するように変更する
   */
  play() {
    this.reset();

    this.isShow = true;
    this.isLoad = true;
  }

  /**
   * フィードバックの表示を停止する
   */
  stop() {
    this.reset();

    this.isShow = false;
    this.isLoad = false;
  }

  /**
   * 保持しているデータをリセットする
   */
  reset() {
    this.goodParticlesPerSecond = 0;
    this.goodParticlesReady = 0;
    this.goodParticlesIndex = 0;

    this.badParticlesPerSecond = 0;
    this.badParticlesReady = 0;
    this.badParticlesIndex = 0;

    this.tempNumOfGood = 0;
    this.tempNumOfBad = 0;
  }

  /**
   * データベースをリセットする
   * フェーズが切り替わった時に
   */
  resetDB() {
    // データベースをリセットする
    remove(this.refFeedback);
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
        drowFeedbackIns.loadFeedback();
      }
    }
  }, [divElement, drowFeedback]);

  useEffect(() => {
    if (drowFeedback) {
      if (phase === PHASES.RESULT) {
        drowFeedback.play();
      } else {
        drowFeedback.resetDB();
        drowFeedback.stop();
      }
    }
  }, [phase, drowFeedback]);

  // render
  return <div className={styles.goodBadPanel} ref={divElement}></div>;
};

export default GoodBadPanel;
