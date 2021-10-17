import { PHASES } from "../../interfaces";
import styles from "./GuideView.module.scss";

const GuideView = ({ phase }) => {
  if (phase === PHASES.GUIDE) {
    return (
      <div className={styles.guidePage}>
        <h1>クリエイター多数決のご参加方法</h1>
        <p>
          下記のQRコードまたはURLを、お手持ちのスマートフォンで読み込んでね！
          <br />
          投票画面に行けるよ！
        </p>
        <h3>https://cfvote2021.web.app/</h3>
        <img
          src={`${process.env.PUBLIC_URL}/creater-fes-QR.png`}
          alt="createrfes-vote-QR"
        />
      </div>
    );
  }
  return null;
};

export default GuideView;
