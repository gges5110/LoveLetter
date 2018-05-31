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
  }

  /*
  * playButton
  */
  setPlayCardOnClick(index) {
    $(`#playButton${index}`).click(function() {
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
    });
  }

  startGame() {
    console.log('Start Game.');
    console.log(this.players);
    console.log('aaa');

    this.turn(this.currentPlayer);
  }

  endGame() {
    $("#status").text(`Game ended, winner is ${gameEnd.winner.number}`);
    players.forEach(player => {
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
      gameEnd = checkGameEnd(players, availableCards);
      if (gameEnd.gameEnd === false) {
        currentPlayer = nextPlayer(players, currentPlayer);
        turn(currentPlayer);
      } else {
        endGame();
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
      let playedCard = player.randomAI(players, cardsNotPlayedYet);
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

    cardsNotPlayedYet[playedCard.card]--;
  }

  resolve(player, playedCard) {
    updatePlayedCard(player, playedCard);

    if (playedCard.card === 'Guard') {
      if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
        if (players[playedCard.against - 1].cards[0] === playedCard.guess) {
          players[playedCard.against - 1].setPlayerDead(cardsNotPlayedYet);
        }
      }
    } else if (playedCard.card === 'Priest') {
      // TODO: create new player field to deal with card info for other players.
      if (player.number === 1) {
        $("#priestList").append(`<li class="item">Player ${players[playedCard.against - 1].number} has ${players[playedCard.against - 1].cards[0]}</li>`);;
      }
    } else if (playedCard.card === 'Baron') {
      if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
        if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) > 0) {
          player.setPlayerDead(cardsNotPlayedYet);
        } else if (compareCards(player.cards[0], players[playedCard.against - 1].cards[0]) < 0) {
          players[playedCard.against - 1].setPlayerDead(cardsNotPlayedYet);
        }
      }
    } else if (playedCard.card === 'Handmaid') {
      player.protected = true;
    } else if (playedCard.card === 'Princess') {
      player.setPlayerDead(cardsNotPlayedYet);
    } else if (playedCard.card === 'King') {
      if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
        let temp = player.cards[0];
        player.cards[0] = players[playedCard.against - 1].cards[0];
        players[playedCard.against - 1].cards[0] = temp;
      }
    } else if (playedCard.card === 'Countess') {
      // TODO: enforce the rule for playing countess?
    } else if (playedCard.card === 'Prince') {
      if (!players[playedCard.against - 1].protected &&  !players[playedCard.against - 1].dead) {
        let discardedCard = players[playedCard.against - 1].discard();
        players[playedCard.against - 1].draw(availableCards);
        if (discardedCard === 'Princess') {
          players[playedCard.against - 1].setPlayerDead(cardsNotPlayedYet);
        }
      }
    }

    setNextTurn();
  }

  initailizeCards() {
    this.availableCards = JSON.parse(JSON.stringify(startingCards));
    this.cardsNotPlayedYet = JSON.parse(JSON.stringify(startingCards));
  }

  /*
  * playAgainstButton
  */
  setPlayAgainstOnClick(index) {
    $(`#playAgainstButton${index}`).click(function() {
      disablePlayAgainstButton();
      playAgainst = index;
      if (players[0].cards[cardToPlay] !== 'Guard') {
        let playedCard = players[0].play(cardToPlay, playAgainst, -1);

        // Resolve card action.
        resolve(players[0], playedCard);
      } else {
        enableGuardGuessButton();
      }
    });
  }

  /*
  * guardGuessButton
  */
  setGuardGuessOnClick(index) {
    $(`#guardGuessButton${index}`).click(function() {
      disableGuardGuessButton();
      let playedCard = players[0].play(cardToPlay, playAgainst, cardNames[index - 1]);

      // Resolve card action.
      resolve(players[0], playedCard);
    });
  }

  initailizeGame() {
    for (let index = 0; index < this.players.length; index++) {
      this.setPlayAgainstOnClick(index + 1);
    }

    for (let index = 0; index < 2; index++) {
      this.setPlayCardOnClick(index + 1);
    }

    for (let index = 1; index < 8; index++) {
      this.setGuardGuessOnClick(index + 1);
    }

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