import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { PHASES } from "../../interfaces";
import styles from "./JudgeCharacter.module.scss";
import * as CONF from "../../configs";

const isDebug = CONF.IS_DEBUG && true;

const JudgeCharacter = ({ phase }) => {
  const [perAnswers, setPerAnswers] = useState({
    perAnswerA: 50,
    perAnswerB: 50,
  });

  // get num of answers
  useEffect(() => {
    const db = getDatabase();
    const votesRef = ref(db, "votes/");

    const unsubscribeVotes = onValue(votesRef, (snapshot) => {
      const votesUpdated = Object.values(snapshot.val());

      // 集計結果
      const numOfVotes = { numOfVoteA: 0, numOfVoteB: 0 };

      for (let i = 0; i < votesUpdated.length; i++) {
        const answer = votesUpdated[i].answer;

        // undefinedチェック
        if (answer) {
          if (answer === "A") {
            numOfVotes.numOfVoteA++;
          } else if (answer === "B") {
            numOfVotes.numOfVoteB++;
          } else {
            if (isDebug) console.error("不明な投票を検知しました", answer);
          }
        }
      }

      let votesLength = numOfVotes.numOfVoteA + numOfVotes.numOfVoteB;
      if (votesLength === 0) votesLength = 1;
      const perAnswerA = Math.round(
        (numOfVotes.numOfVoteA / votesLength) * 100
      );
      const perAnswerB = Math.round(
        (numOfVotes.numOfVoteB / votesLength) * 100
      );

      setPerAnswers({ perAnswerA, perAnswerB });
    });

    return () => {
      unsubscribeVotes();
    };
  }, []);

  let cn = "";
  let resultCn = "";
  if (perAnswers.perAnswerA > perAnswers.perAnswerB) {
    resultCn = styles.resultA;
  } else if (perAnswers.perAnswerA < perAnswers.perAnswerB) {
    resultCn = styles.resultB;
  }

  switch (phase) {
    case PHASES.TALLY:
      cn = styles.tally;
      break;
    case PHASES.RESULT:
      // TODO 集計結果から分岐して、どちらを向くか決める
      cn = resultCn;
      break;
    default:
      cn = styles.idle;
      break;
  }

  return (
    <div className={styles.judgeCharacter}>
      <img className={cn} src="images/moderator/judge-wakayama.png" alt="" />
    </div>
  );
};

export default JudgeCharacter;
