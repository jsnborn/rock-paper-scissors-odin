function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  let choice = prompt("Enter Rock, Paper, or Scissors:").toLowerCase();
  while (!["rock", "paper", "scissors"].includes(choice)) {
    choice = prompt(
      "Invalid! Please enter Rock, Paper, or Scissors:"
    ).toLowerCase();
  }
  return choice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }
  const win =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (win) {
    return `You win! ${humanChoice.charAt(0).toUpperCase()}${humanChoice.slice(
      1
    )} beats ${computerChoice}`;
  } else {
    return `You lose! ${computerChoice
      .charAt(0)
      .toUpperCase()}${computerChoice.slice(1)} beats ${humanChoice}`;
  }
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();
const resultDiv = document.getElementById("result");

resultDiv.innerText = playRound(humanChoice, computerChoice);
