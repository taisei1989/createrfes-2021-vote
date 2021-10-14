import { TwitterShareButton } from "react-share";
import styles from "./ResultDisplay.module.scss";

const ShareToTwitter = ({
  currentTopicText,
  currentAnswerA,
  currentAnswerB,
  voteResultA,
  voteResultB,
}) => {
  return (
    <TwitterShareButton
      url={["\nhttps://thecreative.jp/bakuhatsu2021/\n"]}
      title={[
        currentTopicText +
          "\n" +
          currentAnswerA +
          " " +
          voteResultA +
          "%\n" +
          currentAnswerB +
          "" +
          voteResultB +
          "%",
      ]}
      hashtags={["クリエイター祭り"]}
    >
      <p className={styles.shareButton}>🕊 結果をつぶやく</p>
    </TwitterShareButton>
  );
};

export default ShareToTwitter;
