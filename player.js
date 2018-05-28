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

  this.showHand = function() {
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
  }

  this.setPlayerDead = function() {
    this.dead = true;
    $(`#playerTitle${this.number}`).attr("class","playerDead");
    $(`#playerTitle${this.number}`).append(` - ${this.cards[0]}`);
  }

  this.play = function() {
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
      cardToGuess = 'Priest';
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
    $(`#playerPlayedList${this.number}`).append(`<li>${card} against ${against}</li>`);
    this.cards.splice(cardIndex, 1);
    return {'card': card, 'against': against, 'guess': cardToGuess};
  }

  this.humanPLay = function(cardIndex, against) {
    let card = this.cards[cardIndex];
    $(`#playerPlayedList${this.number}`).append(`<li>${card} against ${against}</li>`);
    this.cards.splice(cardIndex, 1);
    return {'card': card, 'against': against};
  }

  this.discard = function() {
    console.log(`Player ${this.number} discarded a card.`);
    if (this.cards[0] === 'Princess') {
      this.setPlayerDead();
    }
    // TODO: if played against itself, need to discard the right one.
    $(`#playerPlayedList${this.number}`).append(`<li class="discard">${this.cards[0]}</li>`);
    this.cards = [];
  }
}