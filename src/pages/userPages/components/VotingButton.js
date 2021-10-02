const VotingButton = ({answerA, answerB}) => {
  return (
    <div>
      <div>
        <label>{answerA}</label>
        <button>Aを選択する</button>
      </div>
      <div>
        <label>{answerB}</label>
        <button>Bを選択する</button>
      </div>
    </div>
  );
}

export default VotingButton;