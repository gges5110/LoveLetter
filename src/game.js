import Player from './player';
import { getRandomCard, getAvailableCardSize, checkGameEnd, nextPlayer, compareCards } from './util';
import { disablePlayAgainstButton, disableGuardGuessButton, disablePlayButton, enablePlayButton, enableGuardGuessButton, enablePlayAgainstButton } from './setButtonState';
import { cardNames, cardRank, startingCards } from './const';

export default class Game {
  constructor() {
    this.players = [new Player(1), new Player(2), new Player(3), new Player(4)];
    this.cardToPlay = -1;
    var availableCards, currentPlayer, gameEnd;
    var playAgainst, cardsNotPlayedYet;
    this.resolve = this.resolve.bind(this);
    this.setNextTurn = this.setNextTurn.bind(this);
  }

  startGame() {
    console.log('Start Game.');
    this.turn(this.currentPlayer);
  }

  endGame(gameEnd) {
    $("#status").text(`Game ended, winner is ${gameEnd.winner.number}`);
    this.players.forEach(player => {
      if (!player.dead) {
        player.showHand();
      }

      if (player.number === gameEnd.winner.number) {
        $(`#playerTitle${player.number}`).attr("class","playerWin");
      }
    });
  }

  setNextTurn() {
    setTimeout(() => {
      this.gameEnd = checkGameEnd(this.players, this.availableCards);
      if (this.gameEnd.gameEnd === false) {
        this.currentPlayer = nextPlayer(this.players, this.currentPlayer);
        this.turn(this.currentPlayer);
      } else {
        this.endGame(this.gameEnd);
        return;
      }
    }, 1000);
  }

  turn(player) {
    $("#status").text(`Player ${player.number}'s turn, ${getAvailableCardSize(this.availableCards)} cards left.`);
    player.protected = false;
    player.draw(this.availableCards);

    // Let the user pick one to play.
    if (player.number === 1) {
      // Player 1 is defualt to human player.
      enablePlayButton();
      $("#playButton1").text(`${player.cards[0]}`);
      $("#playButton2").text(`${player.cards[1]}`);
    } else {
      let playedCard = player.randomAI(this.players, this.cardsNotPlayedYet);
      console.log(`Player ${player.number} played ${playedCard.card} against ${playedCard.against}`);

      // Resolve card action.
      this.resolve(player, playedCard);
    }
  }

  updatePlayedCard(player, playedCard) {
    if (playedCard.card === 'Handmaid' || playedCard.card === 'Countess') {
      $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card}</li>`);
    } else if (playedCard.card === 'Guard') {
      $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card} against ${playedCard.against}, guessing ${playedCard.guess}</li>`);
    } else {
      $(`#playerPlayedList${player.number}`).append(`<li class="item">${playedCard.card} against ${playedCard.against}</li>`);
    }

    this.cardsNotPlayedYet[playedCard.card]--;
  }

  resolve(player, playedCard) {
    this.updatePlayedCard(player, playedCard);

    if (playedCard.card === 'Guard') {
      if (!this.players[playedCard.against - 1].protected &&  !this.players[playedCard.against - 1].dead) {
        if (this.players[playedCard.against - 1].cards[0] === playedCard.guess) {
          this.players[playedCard.against - 1].setPlayerDead(this.cardsNotPlayedYet);
        }
      }
    } else if (playedCard.card === 'Priest') {
      // TODO: create new player field to deal with card info for other players.
      if (player.number === 1) {
        $("#priestList").append(`<li class="item">Player ${this.players[playedCard.against - 1].number} has ${this.players[playedCard.against - 1].cards[0]}</li>`);;
      }
    } else if (playedCard.card === 'Baron') {
      if (!this.players[playedCard.against - 1].protected &&  !this.players[playedCard.against - 1].dead) {
        if (compareCards(player.cards[0], this.players[playedCard.against - 1].cards[0]) > 0) {
          player.setPlayerDead(this.cardsNotPlayedYet);
        } else if (compareCards(player.cards[0], this.players[playedCard.against - 1].cards[0]) < 0) {
          this.players[playedCard.against - 1].setPlayerDead(this.cardsNotPlayedYet);
        }
      }
    } else if (playedCard.card === 'Handmaid') {
      player.protected = true;
    } else if (playedCard.card === 'Princess') {
      player.setPlayerDead(this.cardsNotPlayedYet);
    } else if (playedCard.card === 'King') {
      if (!this.players[playedCard.against - 1].protected &&  !this.players[playedCard.against - 1].dead) {
        let temp = player.cards[0];
        player.cards[0] = this.players[playedCard.against - 1].cards[0];
        this.players[playedCard.against - 1].cards[0] = temp;
      }
    } else if (playedCard.card === 'Countess') {
      // TODO: enforce the rule for playing countess?
    } else if (playedCard.card === 'Prince') {
      if (!this.players[playedCard.against - 1].protected &&  !this.players[playedCard.against - 1].dead) {
        let discardedCard = this.players[playedCard.against - 1].discard();
        this.players[playedCard.against - 1].draw(this.availableCards);
        if (discardedCard === 'Princess') {
          this.players[playedCard.against - 1].setPlayerDead(this.cardsNotPlayedYet);
        }
      }
    }

    this.setNextTurn();
  }

  initailizeCards() {
    this.availableCards = JSON.parse(JSON.stringify(startingCards));
    this.cardsNotPlayedYet = JSON.parse(JSON.stringify(startingCards));
  }

  /*
  * playButton
  */
  playCardOnClick(index) {
    disablePlayButton();
    console.log(this.players);

    this.cardToPlay = index - 1;
    if (this.players[0].cards[this.cardToPlay] === 'Handmaid' || this.players[0].cards[this.cardToPlay] === 'Countess') {
      let playedCard = this.players[0].play(this.cardToPlay, index, -1);

      // Resolve card action.
      this.resolve(this.players[0], playedCard);
    } else {
      enablePlayAgainstButton(this.players);
    }
  }

  /*
  * playAgainstButton
  */
  playAgainstOnClick(index) {
    disablePlayAgainstButton();
    this.playAgainst = index;
    if (this.players[0].cards[this.cardToPlay] !== 'Guard') {
      let playedCard = this.players[0].play(this.cardToPlay, this.playAgainst, -1);

      // Resolve card action.
      this.resolve(this.players[0], playedCard);
    } else {
      enableGuardGuessButton();
    }
  }

  /*
  * guardGuessButton
  */
  guardGuessOnClick(index) {
    disableGuardGuessButton();
    let playedCard = this.players[0].play(this.cardToPlay, this.playAgainst, cardNames[index - 1]);

    // Resolve card action.
    this.resolve(this.players[0], playedCard);
  }

  initailizeGame() {
    this.restart();
  }

  restart() {
    this.initailizeCards();
    getRandomCard(this.availableCards); // Remove a card from the top of the deck.
    disablePlayAgainstButton();
    disableGuardGuessButton();

    $("#priestList").empty();
    for (let index = 0; index < this.players.length; index++) {
      $(`#playerPlayedList${index + 1}`).empty();
      $(`#playerTitle${index + 1}`).removeClass();
      $(`#playerTitle${index + 1}`).text(`Player ${index + 1}`);
    }

    this.players.forEach(player => {
      player.reset();
      player.draw(this.availableCards);
    });
    this.currentPlayer = this.players[0];
    this.gameEnd = false;
    this.startGame();
  }
}