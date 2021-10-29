import { ref, remove } from "firebase/database";
import { db } from "../../services/firebase";
import styles from "../../pages/AdminPage.module.scss";

const RemoveTopic = ({ topic }) => {
  const handleRemove = () => {
    remove(ref(db, "topics/" + topic.topicId));
  };
  return (
    <button
      className={styles.removeButton}
      onClick={() => {
        handleRemove(topic.topicId);
      }}
      type="submit"
    >
      削除
    </button>
  );
};

export default RemoveTopic;
