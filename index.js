
//Variables and Elements
let deck = {};
let previousCard = {};
let nextCard = {};

let label = createAndAppend("label");


//create function
function createAndAppend(el) {
    let newEl = document.createElement(el);
    document.body.append(newEl);

    return ref to el;
}

async function fetchAPI() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await res.json();

    console.log(data);
    deck = data;
    console.log(deck);
}

function cardValueFormat(card) {
    if (!card.getvalue <= 10 && card.getvalue >= 2) {
        switch x = card.getvalue
        case: x = J {return 11}
        case: x = Q {return 12}
        case: x = K {return 13}
        case: x = A {return 14}
    } else {
        return card.getvalue;
    }
}

async function drawCard(){
    let fetchDrawURL = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
    let draw = await fetchDrawURL.json();
    return cardValueFormat(draw);
}

fetchAPI();
previousCard = drawCard();

const highButt = document.createElement("button");
const sameButt = document.createElement("button");
const lowButt = document.createElement("button");

const buttons = [
    highButt,
    sameButt,
    lowButt
]

for (let i = 0; i < buttons.length; i++) {
    document.body.append(buttons[i]);
}

highButt.addEventListener("click", highDraw);
sameButt.addEventListener("click", sameDraw);
lowButt.addEventListener("click", lowDraw);

async function highDraw() {
    nextCard = drawCard();
    if (previousCard < nextCard) {
        console.log("Korrekt!"); //change to print
        label++
    } else {
        console.log("Tyvärr, försök igen");
    }
    previousCard = nextCard;
}

async function sameDraw() {
    nextCard = drawCard();
    if (previousCard === nextCard) {
        console.log("Korrekt!"); //change to print
        label++
    } else {
        console.log("Tyvärr, försök igen");
    }
    previousCard = nextCard;
}

async function lowDraw() {
    nextCard = drawCard();
    if (previousCard > nextCard) {
        console.log("Korrekt!"); //change to print
        label++
    } else {
        console.log("Tyvärr, försök igen");
    }
    previousCard = nextCard;
}