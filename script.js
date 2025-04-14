const board = document.getElementById("gameBoard");
const letters = "A B C D E F G H".split("");
const gameLetters = [...letters, ...letters].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
  gameLetters.forEach((letter, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.letter = letter;
    card.dataset.index = index;
    card.innerText = ""; // Hidden by default

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  if (lockBoard) return;
  const card = e.currentTarget;
  if (card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.letter;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerText = "";
      secondCard.innerText = "";
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkWin() {
  const matchedCards = document.querySelectorAll(".card.matched");
  if (matchedCards.length === 16) {
    setTimeout(() => {
      alert("🎉🎉🎉🎉 Congratulations! You matched all pairs!🎉🎉🎉🎉");
    }, 500);
  }
}

createBoard();
