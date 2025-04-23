const buttons = document.querySelectorAll('button[data-choice]');
const resultText = document.getElementById('round-result');
const scoreText = document.getElementById('score');
const winnerText = document.getElementById('winner');
const resetButton = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;

// Load sound effects (using .wav files now)
const winSound = new Audio('sounds/win-sound.wav');
const loseSound = new Audio('sounds/lose-sound.wav');
const tieSound = new Audio('sounds/tie-sound.wav');

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

function startCountdown() {
  let countdown = 3;
  resultText.textContent = `Starting in ${countdown}...`;
  
  const countdownInterval = setInterval(() => {
    countdown--;
    resultText.textContent = `Starting in ${countdown}...`;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      resultText.textContent = "Go!";
      setTimeout(() => {
        buttons.forEach(button => {
          button.disabled = false;
        });
      }, 500);
    }
  }, 1000);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.getAttribute('data-choice');
    buttons.forEach(button => button.disabled = true); // Disable buttons while the game is in progress

    // Countdown before round starts
    startCountdown();

    // Wait for the countdown to finish, then run the game logic
    setTimeout(() => {
      const computerChoice = getComputerChoice();
      const result = playRound(playerChoice, computerChoice);
      updateScore(result);
      resultText.textContent = `You chose ${playerChoice}. Computer chose ${computerChoice}. ${result}`;
      scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
      checkWinner();

      // Play the corresponding sound after a delay
      setTimeout(() => {
        if (result.includes('You win')) winSound.play();
        else if (result.includes('Computer wins')) loseSound.play();
        else tieSound.play();
      }, 500); // Play sound after a slight delay to let result show first

    }, 3000); // Wait 3 seconds before showing the result
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
