const cards = document.querySelectorAll(".memory-card");

const flipCard = e => {
    console.log("Event on card click", e.target.parentElement)
}

cards.forEach (card => {
    // Add Event Listener to every card
    card.addEventListener('clic', flipCard);
});