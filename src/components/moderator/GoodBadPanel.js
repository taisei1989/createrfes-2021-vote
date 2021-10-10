import { PHASES } from "../../interfaces";

/**
 * ユーザーから寄せられたGoodとBadを表示するパネル
 * 渡されたphaseに応じて、動作を変えたり、表示非表示をする責務を負う
 */
const GoodBadPanel = ({ phase }) => {
  // TODO: ここにCanvas描写の処理を追加する

  // PhaseがResultの時だけ表示
  if (phase === PHASES.RESULT) {
    return (
      <div className="good-bad-panel">
        GoodBadPanelを表示しています
        <canvas />
      </div>
    );
  }
  return null;
};

export default GoodBadPanel;
