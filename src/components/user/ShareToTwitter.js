import { TwitterShareButton } from "react-share";
import styles from "./UserCommon.module.scss";

const ShareToTwitter = ({
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
  voteResultA,
  voteResultB,
}) => {
  return (
    <div className={styles.shareButtonPanel}>
      <div className={styles.shareButton}>
        <TwitterShareButton
          url={["\nhttps://thecreative.jp/bakuhatsu2021/\n"]}
          title={[
            `${currentTopicText}\n${currentAnswerA} ${voteResultA}%\n${currentAnswerB}${voteResultB}%`,
          ]}
          hashtags={["クリエイター祭り"]}
        >
          <img src="/images/user/twitter-logo.svg" alt="twitter-logo" />
          <p className={styles.buttonText}>結果をつぶやく！</p>
        </TwitterShareButton>
      </div>
    </div>
  );
};

export default ShareToTwitter;
