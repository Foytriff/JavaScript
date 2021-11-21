//Create elements and Appending
let score = 0;
let scoreLabel = document.createElement("label");
document.querySelector(".score").append(scoreLabel);

let currentCardValue = 0;
let prevCardValue = 0;
let deck = {};
let currentCardImg = document.createElement("img");
let prevCardImg = document.createElement("img");
const faceCardCont = document.querySelector(".faceCardsContainer");
const prevCard = faceCardCont.querySelector(".prevCard");
const currentCard = faceCardCont.querySelector(".currentCard");
prevCard.append(prevCardImg);
currentCard.append(currentCardImg);

// Create Button and Listener
let buttonTray = document.createElement("div");
document.body.append(buttonTray);
buttonTray.style.display = "flex";
buttonTray.style.justifyContent = "center";

let HButton = document.createElement("button");
buttonTray.append(HButton);
HButton.addEventListener("click", drawHigh);
HButton.innerText = "Higher";

let button = document.createElement("button");
buttonTray.append(button);
button.addEventListener("click", sameDraw);
button.innerText = "Same";
button.style.margin = "0px .5rem";

let LButton = document.createElement("button");
buttonTray.append(LButton);
LButton.addEventListener("click", drawLow);
LButton.innerText = "Lower";

async function getDeck() {
    var startTime = performance.now()
    let res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    let data = await res.json();
    deck = data;
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
    drawCard();
}
getDeck(); 
drawCard();


function setPrevCardToCurrentCard() {
    prevCardValue = currentCardValue;
    prevCardImg.setAttribute("src", currentCardImg.getAttribute("src"));
}

async function drawCard() {
    if (currentCardImg.getAttribute("src") !== null) setPrevCardToCurrentCard()
    let res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    let data = await res.json();
    currentCardValue = cardValueFormat(data.cards[0].code[0]);
    console.log(currentCardValue);
    currentCardImg.setAttribute("src", `${data.cards[0].image}`);
}

async function drawHigh() {
    await drawCard();
    if (currentCardValue > prevCardValue){
        console.log("Your guess was Correct!");
        score++;
    } else {
        console.log("Your guess was incorrect, try again");
    }
    uptadeScore();
}

async function sameDraw() {
    await drawCard();
    if (currentCardValue == prevCardValue) {
        console.log("AMAZING GUESS! 10 points for you");
        score += 10;
    } else {
        console.log("never lucky, try again");
    }
    uptadeScore();
}

async function drawLow() {
    await drawCard();
    if (currentCardValue < prevCardValue){
        console.log("Your guess was Correct!");
        score++;
    } else {
        console.log("Your guess was incorrect, try again");
    }
    uptadeScore();
}

function cardValueFormat(value) {
    if (!(value <= 10 && value >= 2)) {
        switch (value) {
            case '0':
                return 10;
            case 'J':
                return 11;
            case 'Q': 
                return 12;
            case 'K': 
                return 13;
            case 'A': 
                return 14;
        }
    } else {
        return value;
    }
}

function uptadeScore() {
    scoreLabel.innerText = score;
}