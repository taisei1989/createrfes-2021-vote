import styles from "./TopicAnswerPanel.module.scss";

/**
 * お題と答えを表示するパネル
 */
const TopicAnswerPanel = () => {
  // ここでお題と答えを取得する処理

  return (
    <div className={styles.topicAnswerPanel}>
      <div className={styles.topic}>お題</div>
      <div className={styles.answerA}>答えA</div>
      <div className={styles.answerB}>答えB</div>
    </div>
  );
};

export default TopicAnswerPanel;
