import PreparationPage from "../PreparationPage"
import VotePage from "../VotePage";
import CountPage from "../CountPage";
import TallyPage from "../TallyPage";
import ResultPage from "../ResultPage";
import { PHASES } from "../../../interfaces";

export const display = (phase) => {
  switch (phase) {
    case PHASES.PREPARE:
      return <PreparationPage phase={phase}/>;
    case PHASES.VOTE:
      return <VotePage phase={phase}/>;
    case PHASES.COUNT:
      return <VotePage phase={phase}/>;
    case PHASES.TALLY:
      return <TallyPage phase={phase}/>;
    case PHASES.RESULT:
      return <ResultPage phase={phase}/>;
    case PHASES.GUIDE:
      return <PreparationPage phase={phase}/>;
    default:
      return <p>ページが存在しないよ！</p>;
  }
};