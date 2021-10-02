import PreparationPage from "../PreparationPage"
import VotePage from "../VotePage";
import CountPage from "../CountPage";
import TallyPage from "../TallyPage";
import ResultPage from "../ResultPage";
import { PHASES } from "../../../interfaces";

export const display = (phase) => {
  switch (phase) {
    case PHASES.PREPARE:
      return <PreparationPage />;
    case PHASES.VOTE:
      return <VotePage />;
    case PHASES.COUNT:
      return <CountPage />;
    case PHASES.TALLY:
      return <TallyPage />;
    case PHASES.RESULT:
      return <ResultPage />;
    case PHASES.GUIDE:
      return <PreparationPage />;
    default:
      return <p>ページが存在しないよ！</p>;
  }
};