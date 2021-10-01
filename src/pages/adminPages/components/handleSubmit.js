import { ref, set } from "firebase/database";
import { db } from "../../../services/firebase";

export const submitTopic = (event, topic, answerA, answerB) => {
  console.log(event, topic, answerA, answerB);
  event.preventDefault();
  let topicId = Math.random().toString(32).substring(2);
  if (topic === "" || answerA === "" || answerB === "") {
    console.log("回答されていない箇所があります");
    return;
  }
  set(ref(db, "topics/" + topicId), {
    topicId: topicId,
    topicText: topic,
    topicAnswerA: answerA,
    topicAnswerB: answerB,
  });
};
