const cards = document.querySelectorAll(".memory-card");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".control-container")


 

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

let second = 0,
  minute = 0;

  const timeGenerator = () => {
    second += 1;

    if(second>=60) {
        minute += 1;
        second = 0;
    }
  };

// let secondsValue = second < 10 ? `0${seconds}` : seconds;
// let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
// timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;


const flipCard = e => {
    if (boardLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = target;
    }else {

        hasFlippedCard = false;
        secondCard = target;

        checkForMatch();
    }
};

const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;

    isEqual ? disableCards() : unflipCards();
};

function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

const unflipCards = () => {
      boardLocked = true;

      setTimeout (() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
        }, 1000);
};

const resetBoard = () => {
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};


cards.forEach(card => {

    // Add Event Listener to every card
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
}); 