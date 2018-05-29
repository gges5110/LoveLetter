// Player definition
function player(number) {
  this.number = number;
  this.dead = false;
  this.protected = false;
  this.cards = [];
  this.draw = function() {
    console.log(`Draw a card for player ${this.number}`);
    this.cards.push(getRandomCard());
  }

  this.reset = function() {
    this.dead = false;
    this.protected = false;
    this.cards = [];
  }

  this.showHand = function() {
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
  }

  this.setPlayerDead = function() {
    this.dead = true;
    $(`#playerTitle${this.number}`).attr("class","playerDead");
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
    cardsNotPlayedYet[this.cards[0]]--;
  }

  this.randomAI = function() {
    let cardIndex;
    if (compareCards(this.cards[0], this.cards[1]) > 0) {
      cardIndex = 0;
    } else {
      cardIndex = 1;
    }
    // let cardIndex = Math.floor(Math.random() * 2);
    let card = this.cards[cardIndex];
    let cardToGuess;
    if (card === 'Guard') {
      // Randomly choose from the highest not yet appeared card.
      cardToGuess = getHighestNotYetAppearedCard(this.cards);
    }
    // TODO: Play against random non dead/non protected person.
    let against = this.number % 4 + 1;
    let getNonDeadNonProtectedPlayerList = getNonDeadNonProtectedPlayers(this);
    if (getNonDeadNonProtectedPlayerList.length == 0) {
      // The player is the winner.
    } else {
      // Randomly select one player to play the card against.
      let randomPlayerIndex = Math.floor(Math.random() * getNonDeadNonProtectedPlayerList.length);
      against = getNonDeadNonProtectedPlayerList[randomPlayerIndex];
    }
    let playedCard = this.play(cardIndex, against, cardToGuess);
    return playedCard;
  }

  this.play = function(cardIndex, against, cardToGuess) {
    let card = this.cards[cardIndex];
    cardsNotPlayedYet[card]--;
    this.cards.splice(cardIndex, 1);
    return {'card': card, 'against': against, 'guess': cardToGuess};
  }

  this.discard = function() {
    console.log(`Player ${this.number} discarded a card.`);
    let discardedCard = this.cards[0];
    cardsNotPlayedYet[discardedCard]--;
    // TODO: if played against itself, need to discard the right one.
    $(`#playerPlayedList${this.number}`).append(`<li class="discard item">${discardedCard}</li>`);
    this.cards = [];
    return discardedCard;
  }
}