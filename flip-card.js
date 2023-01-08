const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    // console.log("I was clicked");
    // console.log(this);

    if (lockBoard) return;
    // Same card twice click disabled
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        // hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {

    // shorter way to write this is ternanry opertaor used below
    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     disableCards();
    // } else {
    //     unflipCards();
    // }

    // do cards match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();

    // console.log(firstCard.dataset.framework);
    // console.log(secondCard.dataset.framework);
}

function disableCards() {
    // if match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    // not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.getElementsByClassName.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));