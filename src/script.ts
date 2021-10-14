const X_CLASS: string = "x";
const CIRCLE_CLASS: string = "circle";
const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]") as any;
const board = document.getElementById("board") as HTMLElement;
const winningMessageElement = document.getElementById(
  "winningMessage"
) as HTMLElement;
const restartButton = document.getElementById("restartButton") as HTMLElement;
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
) as HTMLElement;

let circleTurn: boolean;

startGame();

restartButton.addEventListener("click", startGame);

function startGame(): void {
  circleTurn = false;

  cellElements.forEach((cell: HTMLElement) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e: Event): void {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // Check For Win
    // Check For Draw
    // Switch Turns
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw: boolean): void {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} WINS!!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw(): boolean {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell: any, currentClass: string): void {
  cell.classList.add(currentClass);
}

function swapTurns(): void {
  circleTurn = !circleTurn;
}

function setBoardHoverClass(): void {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass: string): boolean {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
