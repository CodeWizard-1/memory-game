const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = e => {
    if (boardLocked) return;
    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    console.log("Framework of current card", target.dataset.framework);

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
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework

    isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {

    firstCard.removeEventListener("Click", flipCard);
    secondCard.removeEventListener("click", flipCard);

}

const unflipCards = () => {
      boardLocked = true;

      setTimeout (() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        boardLocked = false;
        }, 1000);
}



cards.forEach(card => {

    // Add Event Listener to every card
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
}); 