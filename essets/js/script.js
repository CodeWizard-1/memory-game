const cards = document.querySelectorAll(".memory-card");
const timerDisplay = document.getElementById("timer");

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

let startTime;
let endTime;
let timerInterval;

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 10); // Обновляем каждые 10 миллисекунд
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60);
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

function flipCard() {
    if (boardLocked) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;
    }
    secondCard = this;
    checkForMatch();
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
    }, 500);
}

function resetBoard() {
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];

    const flippedCards = document.querySelectorAll(".memory-card.flip");

    if (flippedCards.length === cards.length) {
        console.log("Game Over");
        endTime = new Date().getTime();
        stopTimer();
        showGameTime();
    }
}

function showGameTime() {
    const elapsedTime = endTime - startTime;
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60);

    const gameTimeDisplay = document.createElement("div");
    gameTimeDisplay.classList.add("game-time");
    gameTimeDisplay.textContent = `Твое время: ${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;

    document.body.appendChild(gameTimeDisplay);
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});
