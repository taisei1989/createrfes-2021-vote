import { PHASES } from "../../interfaces";

const PreparationPage = ({ phase }) => {
  if (phase === PHASES.PREPARE) {
    return (
      <div>
        <img
          src="http://placehold.jp/400x150.png"
          alt="createrfes-vote-title"
        />
        <p>ただいま準備中…</p>
        <p>お題を用意しているよ！</p>
      </div>
    );
  }
  return null;
};

export default PreparationPage;
