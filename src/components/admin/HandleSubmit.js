import { ref, push, child, update } from "firebase/database";
import { db } from "../../services/firebase";

const HandleSubmit = ({ event, topic, answerA, answerB }) => {
  event.preventDefault();
  if (topic === "" || answerA === "" || answerB === "") {
    console.log("回答されていない箇所があります");
    return;
  }
  const newPostKey = push(child(ref(db), "topics/")).key;
  const postData = {
    topicId: newPostKey,
    topicText: topic,
    topicAnswerA: answerA,
    topicAnswerB: answerB,
  };

  const updates = {};
  updates["/topics/" + newPostKey] = postData;

  return update(ref(db), updates);
};

export default HandleSubmit;
