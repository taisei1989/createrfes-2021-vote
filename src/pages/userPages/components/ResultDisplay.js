import { onDisconnect, onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { PHASES } from "../../../interfaces";
import { db } from "../../../services/firebase";

/**
 * ユーザーの回答を集計する
 *
 */
const ResultDisplay = ({ currentAnswerA, currentAnswerB, phase }) => {
  const [allAnswers, setAllAnswers] = useState([]);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [answerA, setAnswerA] = useState([]);

  // TODO: Firebase から集計のデータを受け取る
  useEffect(() => {
    const voteRef = ref(db, "votes/");
    onValue(voteRef, (snapshot) => {
      const data = Object.values(snapshot.val());
      console.log(data);
      if (data) {
        setAllAnswers(data);
      }
      data.map((vote) => {
        console.log(vote.answer);
        setCountA(countA + 1);
        if (vote.answer === "A") {
          setCountA(countA + 1);
        }
      });
    });
    return () => {
      onDisconnect(voteRef);
    };
  }, []);
  console.log(allAnswers);
  console.log(countA);
  console.log(countB);
  console.log(answerA);

  // TODO: 受け取ったデータからA, Bそれぞれの集計を行いデータをこのコンポーネント内で保持する

  if (phase === PHASES.RESULT) {
    return (
      <div>
        <p>
          {currentAnswerA}: {countA}
        </p>
        <p>{currentAnswerB}: 70%</p>
        <button>Good</button>
        <button>Bad</button>
        <br />
        <button>結果をつぶやく</button>
        <p>感想をシェアしよう！</p>
        {}
      </div>
    );
  }
  return null;
};

export default ResultDisplay;
