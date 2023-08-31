const cards = document.querySelectorAll(".memory-card");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".control-container")


let interval;

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;


//Initial time
let seconds = 0,
    minutes = 0;

//Initial moves and win count
let movesCount = 0,
    winCount = 0;


// For timer
const timeGenerator = () => {
    seconds += 1;
     //minute logic
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    //format time before displaying

let secondsValue = seconds < 10 ? `0${seconds}` :seconds;
let minutesValue = minutes < 10 ? `0${minutes}` :minutes;
timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesConter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};


const flipCard = e => {
    if (boardLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = target;
        winCount += 1;
        if (winCount == Math.floor(cards.length/2)){
            result.innerHTML = `<h2>You Won</h2><h4>Moves: ${movesConter}</h4>`;
            stopGame();
        }
    } else {

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

    setTimeout(() => {
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


//Initialiaze values and func calls
const initialiazer = () => {
    result.innerText = "";
    winCount = 0;
    // let flipCard = isEqual();
    // console.log(flipCard);
};

//Start game

startButton.addEventListener("click", () => {
    movesCount = 0;
    time = 0;
    seconds = 0;
    minutes = 0;
//controls and buttons visibility
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
//Start timer
    interval = setInterval(timeGenerator, 1000);

//initial moves
    moves.innerHTML = `<span>Moves:</span> ${movesCont}`;

    initialiazer();

});

//Stop game
stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

