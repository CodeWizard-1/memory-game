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

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById("start-game-modal");
    modal.style.display = "none";
}

window.onload = openModal;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
    closeModal(); // Закрыть модальное окно
    shuffleCards(); // Запустить игру
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
        console.log("Game Over");
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
    // checkForAllCardsOpen();
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

    checkForAllCardsOpen();

    // boardLocked = false;
}

function showGameTime() {
    const elapsedTime = endTime - startTime;
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60);

    const playerNameInput = document.getElementById("player-name").value;

    if (!playerNameInput) {
        alert("Пожалуйста, введите ваше имя.");
        return; // Прервать выполнение, если имя не введено
    }

    const gameTimeDisplay = document.createElement("div");

    document.body.appendChild(gameTimeDisplay);

    const playerTime = `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;

    results.push({ name: playerNameInput, time: playerTime });

    results.sort((a, b) => {
        return new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`);
    });

    updateResultsTable();
}

// Добавьте обработчик события для кнопки "Готово"
const submitNameButton = document.getElementById("submit-name");
submitNameButton.addEventListener("click", showGameTime);



// document.body.appendChild(gameTimeDisplay);

function updateResultsTable() {
    let tableContainer = document.getElementById("results-table");
    if (!tableContainer) {
        // Создать контейнер таблицы, если его нет
        tableContainer = document.createElement("div");
        tableContainer.id = "results-table";
        document.body.appendChild(tableContainer);
    }

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Имя</th>
                <th>Время</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";

    results.forEach((result, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.time}</td>
        `;
        tableBody.appendChild(row);
    });

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
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
});

function resetGame() {
    // Сброс всех переменных и состояний игры.
    stopTimer(); // Остановить таймер (если он работает).
    resetTimer(); // Сбросить таймер.
    closeResults(); // Скрыть результаты (если они отображаются).
    resetCards(); // Сбросить состояние всех карт (закрыть их).
    shuffleCards(); // Перетасовать карты.
    openModal(); // Открыть модальное окно начала игры.
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerDisplay.textContent = "0:00:00.000";
}

function resetCards() {
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}

function closeResults() {
    // Закрыть результаты игры или очистить соответствующий контейнер на вашей странице (если он есть).
    const resultsContainer = document.getElementById("results-table");
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
}




