const cards = document.querySelectorAll(".memory-card");
const timerDisplay = document.getElementById("timer");
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-button");


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

    if (playerNameInput.value.trim() !== "") {
        modal.style.display = "none";
        startButton.disabled = true;
        shuffleCards();
    }
}


function validatePlayerName() {
    if (playerNameInput.value.trim() !== "") {
        startButton.removeAttribute("disabled");
    } else {
        startButton.setAttribute("disabled", "disabled");
    }
}

playerNameInput.addEventListener("input", validatePlayerName);

window.onload = openModal;

startButton.addEventListener("click", () => {
    if (playerNameInput.value.trim() !== "") {
        closeModal();
        shuffleCards();
    }
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
    updateRating(playerName, elapsedTime);

    displayResultsModal();
}

function updateRating(playerName, time) {
    const result = {
        playerName,
        time,
    };

    results.push(result);
    results.sort((a, b) => a.time - b.time);
    if (results.length > 5) {
        results.pop();
    }

    localStorage.setItem("memoryGameResults", JSON.stringify(results));
}


function displayResultsModal() {
    const resultsModal = document.getElementById("results-modal");
    resultsModal.style.display = "flex";

    const bestResultsTable = document.getElementById("best-results-table");
    bestResultsTable.innerHTML = "";

    const storedResults = JSON.parse(localStorage.getItem("memoryGameResults")) || [];

    for (let i = 0; i < storedResults.length; i++) {
        const result = storedResults[i];
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${result.playerName}</td>
                    <td>${formatTime(result.time)}</td>
                `;
        bestResultsTable.appendChild(row);
    }
}


function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const millisecondsPart = milliseconds % 1000;
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedMilliseconds = millisecondsPart.toString().padStart(3, "0");
    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
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

    localStorage.removeItem("memoryGameResults");

    displayResultsModal();
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
    const resultsContainer = document.getElementById("best-results-table");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
}
function hideResultsModal() {
    const resultsModal = document.getElementById("results-modal");
    resultsModal.style.display = "none";
}