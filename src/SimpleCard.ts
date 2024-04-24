export function initHigherLowerGame() {
  WA.state.remainCard = listAllCards();
  WA.state.actualCard = null;
}

export function pickCard() {
  if ((WA.state.remainCard as any[]).length === 0) {
    WA.chat.sendChatMessage("No more cards, We will refill the deck", "Dealer");
    WA.state.remainCard = listAllCards();
  }

  //   Pick a random card
  let index = pickRandomCard(WA.state.remainCard as any[]);

  //   Display the card
  WA.chat.sendChatMessage(
    "Random card: " + (WA.state.remainCard as any[])[index].text,
    "Dealer"
  );

  //   Save the card
  WA.state.actualCard = (WA.state.remainCard as any[])[index];

  //  Remove the card from the deck
  (WA.state.remainCard as any[]).splice(index, 1);
}

export function compareCards(actualCard: any, nextCard: any, guess: string) {
  if (actualCard.value === nextCard.value) {
    WA.chat.sendChatMessage("It's a draw", "Dealer");
    return;
  }

  if (
    (guess === "higher" && nextCard.value > actualCard.value) ||
    (guess === "lower" && nextCard.value < actualCard.value)
  ) {
    WA.chat.sendChatMessage("You win", "Dealer");
  } else {
    WA.chat.sendChatMessage("You lose", "Dealer");
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
