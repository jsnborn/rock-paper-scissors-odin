const buttons = document.querySelectorAll('button[data-choice]');
const resultText = document.getElementById('round-result');
const scoreText = document.getElementById('score');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  }

  const wins = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return wins[playerSelection] === computerSelection
    ? 'You win this round!'
    : 'Computer wins this round!';
}

function updateScore(result) {
  if (result.includes('You win')) playerScore++;
  else if (result.includes('Computer wins')) computerScore++;
}

function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    winnerText.textContent = playerScore === 5
      ? '🎉 You won the game!'
      : '😔 Computer won the game.';
    buttons.forEach(btn => btn.disabled = true);
    resetButton.classList.remove('hidden');
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);
    updateScore(result);
    resultText.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
    scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    checkWinner();
  });
});

resetButton.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  resultText.textContent = 'Choose your move!';
  scoreText.textContent = `Player: 0 | Computer: 0`;
  winnerText.textContent = '';
  buttons.forEach(btn => btn.disabled = false);
  resetButton.classList.add('hidden');
});
