//Create elements and Appending
let deck = {};
let currentCardImg = document.createElement("img");
let prevCardImg = document.createElement("img");
const faceCardCont = document.querySelector(".faceCardsContainer");
const prevCard = faceCardCont.querySelector(".prevCard");
const currentCard = faceCardCont.querySelector(".currentCard");
prevCard.append(prevCardImg);
currentCard.append(currentCardImg);

// Create Button and Listener
let button = document.createElement("button");
document.body.append(button);
button.addEventListener("click", drawCard);
button.innerText = "draw";

async function getDeck() {
    var startTime = performance.now()
    let res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let data = await res.json();
    deck = data;
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
    drawCard();
}
getDeck(); //Gets deck and draws first card

//Card Draw Functions
function setPrevCardToCurrentCard() {
    prevCardImg.setAttribute("src", currentCardImg.getAttribute("src"));
}

function drawCard() {
    if (currentCardImg.getAttribute("src") != null) {setPrevCardToCurrentCard();}
    setTimeout(async () => {
        let res = fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
        let data = await (await res).json();
        currentCardImg.setAttribute("src", `${data.cards[0].image}`);
    }, 1000);
}



