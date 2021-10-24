import { update, ref } from "@firebase/database";
import { db } from "../../services/firebase";

export const updatedCurrentTopic = (id, topic, answerA, answerB) => {
  // A post entry
  console.log("SetCurrentTopicを実行しました");
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
