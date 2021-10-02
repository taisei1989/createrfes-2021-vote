import { useEffect, useState } from "react";
import { ref, onValue, onDisconnect} from "firebase/database";
import { db } from "../../services/firebase";
import VotingButton from "./components/VotingButton";

const VotePage = () => {
  const [currentTopic, setCurrentTopic] = useState([]);

  useEffect(() => {
    const currentTopicRef = ref(db, "current/");
    onValue(currentTopicRef, (snapshot) => {
      const currentTopicUpdated = Object.values(snapshot.val());
      // nullチェック
      if (currentTopicUpdated) {
        setCurrentTopic(currentTopicUpdated);
      }
    });
    return (
      onDisconnect(currentTopicRef)
    );
  }, []);

  return (
    <div>
      <h1>VotePage</h1>
      <p>お題：{currentTopic[3]}</p>
      <VotingButton
        answerA={currentTopic[0]}
        answerB={currentTopic[1]}
      />
    </div>
  );
};

export default VotePage;
