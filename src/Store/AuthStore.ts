import { action, observable } from "mobx";

type idType = "newId" | "prevId";

export class AuthStore {
  @observable guessedCards: Array<string> = [];
  @observable cards: Array<string> = ["asd"];
  @observable newId: string = "";
  @observable prevId: string = "";

  @action addGuessedCards = (guessed: string | Array<string>) => {
    if (Array.isArray(guessed)) {
      this.guessedCards = [...this.guessedCards, ...guessed];
    } else {
      this.guessedCards = [...this.guessedCards, guessed];
    }
  };

  @action clearGuessedCards = () => {
    this.guessedCards = [];
  };

  @action mixCards = () => {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this.cards;
  };

  @action setId = (id: string, type: idType) => {
    if (type === "newId") {
      this.newId = id;
    } else {
      this.prevId = id;
    }
  };
}
