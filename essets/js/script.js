const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;

const flipCard = e => {
    const target = e.target.parentElement;

    target.classList.add("flip");

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstCard = target;
    }else {

        hasFlippedCard = false;
        secondCard = target;
    }


};
cards.forEach(card => {
    // Add Event Listener to every card
    card.addEventListener("clic", flipCard);
}); 