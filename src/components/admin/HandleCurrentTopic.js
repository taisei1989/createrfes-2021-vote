import { update, ref } from "@firebase/database";
import { db } from "../../services/firebase";

const HandleCurrentTopic = ({ id, topic, answerA, answerB }) => {
  // A post entry
  const postData = {
    currentTopicId: id,
    currentTopicText: topic,
    currentAnswerA: answerA,
    currentAnswerB: answerB,
  };

  const updates = {};
  updates["/current/"] = postData;

  return update(ref(db), updates);
};

export default HandleCurrentTopic;
