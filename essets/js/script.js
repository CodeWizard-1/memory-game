const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;


    checkForMatch();

    if (document.querySelectorAll(".memory-card").length == document.querySelectorAll(".memory-card.flip").length) {
        console.log("Game Over");
        document.querySelectorAll(".memory-card.flip").forEach(c => c.classList.remove("flip"));
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    boardLocked = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}


cards.forEach(card => {

    // Add Event Listener to every card
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});


// //Initialiaze values and func calls
// const initialiazer = () => {
//     result.innerText = "";
//     winCount = 0;
//     let flipCard = randomIndex();
//     console.log(flipCard);
// };

// //Start game
// startButton.addEventListener("click", () => {
//     movesCount = 0;
//     seconds = 0;
//     minutes = 0;
// //controls and buttons visibility
//     controls.classList.add("hide");
//     stopButton.classList.remove("hide");
//     startButton.classList.add("hide");
// //Start timer
//     interval = setInterval(timeGenerator, 1000);

// //initial moves
//     moves.innerHTML = `<span>Moves:</span> ${movesCont}`;

//     initialiazer();

// });

// //Stop game
// stopButton.addEventListener("click", (stopGame = () => {
//     controls.classList.remove("hide");
//     stopButton.classList.add("hide");
//     startButton.classList.remove("hide");
//     clearInterval(interval);
//   })
// );

