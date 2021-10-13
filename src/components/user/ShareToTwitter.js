import { TwitterShareButton, TwitterIcon } from "react-share";
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
      className={styles.share}
    >
      <TwitterIcon id="shereToTwitter" size={32} round={false} />
      <label htmlFor="shereToTwitter">結果をつぶやく</label>
    </TwitterShareButton>
  );
};

export default ShareToTwitter;
