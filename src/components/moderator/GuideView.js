import { PHASES } from "../../interfaces";
import styles from "./GuideView.module.scss";

const GuideView = ({ phase }) => {
  const isShownCN = phase === PHASES.GUIDE ? styles.isShown : styles.isHidden;

  return (
    <div className={`${styles.guideView} ${isShownCN}`}>
      <h1 className={styles.title}>クリエイター多数決のご参加方法</h1>
      <p className={styles.text}>
        下記のQRコードまたはURLを、お手持ちのスマートフォンで読み込んでね！
        <br />
        投票画面に行けるよ！
      </p>
      <p className={styles.link}>https://cfvote2021.web.app/</p>
      <figure className={styles.figure}>
        <img src="images/moderator/guide-qr.png" alt="参加用のQRコード" />
      </figure>
    </div>
  );
};

export default GuideView;
