import PreparationPage from "../PreparationPage";
import VotePage from "../VotePage";
import ResultPage from "../ResultPage";
import { PHASES } from "../../../interfaces";

export const display = (phase) => {
  switch (phase) {
    case PHASES.PREPARE:
      return <PreparationPage phase={phase} />;
    case PHASES.GUIDE:
      return <PreparationPage phase={phase} />;
    case PHASES.VOTE:
      return <VotePage phase={phase} />;
    case PHASES.COUNT:
      return <VotePage phase={phase} />;
    case PHASES.TALLY:
      return <VotePage phase={phase} />;
    case PHASES.RESULT:
      return <VotePage phase={phase} />;
    default:
      return <p>ページが存在しないよ！</p>;
  }
};
