let actualCardDisplayer: any = null;
let nextCardDisplayer: any = null;
let resultLowerHigher: any = null;

let higherButton: any = null;
let lowerButton: any = null;

WA.onInit()
  .then(() => {
    actualCardDisplayer = document.getElementById("actual-card-displayer");
    nextCardDisplayer = document.getElementById("next-card-displayer");
    resultLowerHigher = document.getElementById("result-lower-higher");

    higherButton = document.getElementById("button-higher");
    lowerButton = document.getElementById("button-lower");

    initHigherLowerGame();
    pickCard();
    actualCardDisplayer.src = (WA.state.actualCard as any).img;

    higherButton?.addEventListener("click", () => {
      const actualCard = WA.state.actualCard;
      pickCard();
      compareCards(actualCard, WA.state.actualCard, "higher");
      //   actualCardDisplayer.src = (WA.state.actualCard as any).img;
      nextCardDisplayer.src = (WA.state.actualCard as any).img;

      higherButton.disabled = true;
      lowerButton.disabled = true;

      setTimeout(() => {
        actualCardDisplayer.src = (WA.state.actualCard as any).img;
        nextCardDisplayer.src = "/public/images/cards/card-back1.png";
        higherButton.disabled = false;
        lowerButton.disabled = false;
      }, 1000);
    });

    lowerButton?.addEventListener("click", () => {
      const actualCard = WA.state.actualCard;
      pickCard();
      compareCards(actualCard, WA.state.actualCard, "lower");
      //   actualCardDisplayer.src = (WA.state.actualCard as any).img;
      nextCardDisplayer.src = (WA.state.actualCard as any).img;

      higherButton.disabled = true;
      lowerButton.disabled = true;

      setTimeout(() => {
        actualCardDisplayer.src = (WA.state.actualCard as any).img;
        nextCardDisplayer.src = "/public/images/cards/card-back1.png";
        higherButton.disabled = false;
        lowerButton.disabled = false;
      }, 1000);
    });
  })
  .catch((e) => console.error(e));

function initHigherLowerGame() {
  WA.state.remainCard = listAllCards();
  WA.state.actualCard = null;
}

function pickCard() {
  if ((WA.state.remainCard as any[]).length === 0) {
    // WA.chat.sendChatMessage("No more cards, We will refill the deck", "Dealer");
    WA.state.remainCard = listAllCards();
  }

  //   Pick a random card
  let index = pickRandomCard(WA.state.remainCard as any[]);

  //   Display the card
  //   WA.chat.sendChatMessage(
  //     "Random card: " + (WA.state.remainCard as any[])[index].text,
  //     "Dealer"
  //   );

  //   Save the card
  WA.state.actualCard = (WA.state.remainCard as any[])[index];

  //  Remove the card from the deck
  (WA.state.remainCard as any[]).splice(index, 1);
}

function compareCards(actualCard: any, nextCard: any, guess: string) {
  if (actualCard.value === nextCard.value) {
    resultLowerHigher.innerHTML = "It's a tie";
    return;
  }

  if (
    (guess === "higher" && nextCard.value > actualCard.value) ||
    (guess === "lower" && nextCard.value < actualCard.value)
  ) {
    resultLowerHigher.innerHTML = "You win!";
    (WA.player.state.coins as number) += 1;
  } else {
    resultLowerHigher.innerHTML = "You lose!";
    (WA.player.state.coins as number) -= 1;
  }
}

function getCard(suitInput: number, valueInput: number) {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];

  return {
    text: values[valueInput] + " of " + suits[suitInput],
    value: valueInput,
    suit: suits[suitInput],
    img:
      "/public/images/cards/card-" +
      suits[suitInput] +
      "-" +
      (valueInput + 1) +
      ".png",
  };
}

function listAllCards() {
  const cards = [];
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      cards.push(getCard(j, i));
    }
  }
  return cards;
}

function pickRandomCard(remainCard: any[]) {
  return Math.floor(remainCard.length * Math.random());
}
