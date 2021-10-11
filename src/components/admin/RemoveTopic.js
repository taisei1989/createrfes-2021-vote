import { ref, remove } from "firebase/database";
import { db } from "../../services/firebase";

const RemoveTopic = ({ topic }) => {
  const handleRemove = () => {
    remove(ref(db, "topics/" + topic.topicId));
  };
  return (
    <button
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
