import { onDisconnect, onValue, ref } from "@firebase/database";
import { useState, useEffect } from "react";
import { PHASES } from "../../interfaces";
import { db } from "../../services/firebase";

/**
 * ユーザーの回答を集計する
 *
 */

export const VotesResultA = ({ phase }) => {
  const [numOfAnswer, setNumOfAnswer] = useState(0);

  // TODO: Firebase から集計のデータを受け取る
  useEffect(() => {
    const voteRef = ref(db, "votes/");

    onValue(voteRef, (snapshot) => {
      const votesUpdated = Object.values(snapshot.val());

      // 集計結果
      let numOfVoteA = 0;
      let numOfVoteB = 0;

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVoteA++;
          } else if (answer === "B") {
            numOfVoteB++;
          } else {
            console.log("不明な投票を検知しました", answer);
          }
        }
      }

      const PercentOfVote = Math.round(
        (numOfVoteA / (numOfVoteA + numOfVoteB)) * 100
      );

      // 反映する
      setNumOfAnswer(PercentOfVote);
    });

    return () => {
      onDisconnect(voteRef);
    };
  }, []);

  if (phase === PHASES.TALLY) {
    return <p>???%</p>;
  } else if (phase === PHASES.RESULT) {
    return <p>{numOfAnswer}%</p>;
  }
  return null;
};

export const VotesResultB = ({ phase }) => {
  const [numOfAnswer, setNumOfAnswer] = useState(0);

  // TODO: Firebase から集計のデータを受け取る
  useEffect(() => {
    const voteRef = ref(db, "votes/");

    onValue(voteRef, (snapshot) => {
      const votesUpdated = snapshot.val();

      // 集計結果
      let numOfVoteA = 0;
      let numOfVoteB = 0;

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVoteA++;
          } else if (answer === "B") {
            numOfVoteB++;
          } else {
            console.log("不明な投票を検知しました", answer);
          }
        }
      }

      const PercentOfVote = Math.round(
        (numOfVoteB / (numOfVoteA + numOfVoteB)) * 100
      );

      // 反映する
      setNumOfAnswer(PercentOfVote);
    });

    return () => {
      onDisconnect(voteRef);
    };
  }, []);

  if (phase === PHASES.TALLY) {
    return <p>???%</p>;
  } else if (phase === PHASES.RESULT) {
    return <p>{numOfAnswer}%</p>;
  }
  return null;
};
