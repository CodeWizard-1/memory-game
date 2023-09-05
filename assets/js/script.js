const cards = document.querySelectorAll(".memory-card");
const timerDisplay = document.getElementById("timer");

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

let startTime;
let endTime;
let timerInterval;

const results = [];

function openModal() {
    const modal = document.getElementById("start-game-modal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("start-game-modal");
    modal.style.display = "none";
}

window.onload = openModal;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
    closeModal();
    shuffleCards();
});

function startTimer() {
    if (!timerInterval) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 10);
    }
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

function checkForAllCardsOpen() {
    const flippedCards = document.querySelectorAll('.memory-card.flip');
    if (flippedCards.length === cards.length) {
        endTime = new Date().getTime();
        stopTimer();
        showGameTime();
    }
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
    }, 1000);
}

function showGameTime() {
    const playerName = document.getElementById("player-name").value;
    const resultPlayerName = document.getElementById("result-player-name");
    const resultTime = document.getElementById("result-time");

    resultPlayerName.textContent = playerName;

    const currentTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    const formattedTime = formatTime(elapsedTime);

    resultTime.textContent = formattedTime;

    displayResultsModal();
}

function displayResultsModal() {
        const resultsModal = document.getElementById("results-modal");
        resultsModal.style.display = "flex";
}


function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
}


function resetBoard() {
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null];

    checkForAllCardsOpen();
}

function shuffleCards() {
    cards.forEach(card => {
        card.addEventListener("click", flipCard);

        const randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
    });

}

shuffleCards();

const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", () => {
    resetGame();
    hideResultsModal(); 
});

function resetGame() {
    stopTimer();
    resetTimer();
    closeResults();
    resetCards();
    shuffleCards();
    openModal();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "0:00:00";
}

function resetCards() {
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}

function closeResults() {
    const resultsContainer = document.getElementById("results-table");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
}
function hideResultsModal() {
    const resultsModal = document.getElementById("results-modal");
    resultsModal.style.display = "none";
}