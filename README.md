# Love Letter
[![build status](https://img.shields.io/travis/gges5110/LoveLetter/master.svg)](https://travis-ci.org/gges5110/LoveLetter)
[![Coverage Status](https://coveralls.io/repos/github/gges5110/LoveLetter/badge.svg?branch=master&service=github)](https://coveralls.io/github/gges5110/LoveLetter?branch=master)
This is a project built to replicate the [Love Letter](https://boardgamegeek.com/boardgame/129622/love-letter) board game, and hosting on GitHub pages.

### Pre-requisite
* Install [Node.js](https://nodejs.org/en/)
* Install Node dependencies
* Build the project

Once you have done all above steps, you should be able to open [index.html](./index.html) with your browser and see the game running.

### Commands
```bash
# Install Node dependencies
$ npm install
# Build Project
$ npm run webpack
# You can also let webpack watch the src folder for any changes
$ npm run webpack:watch
# Run test
$ npm test
```

### Current Players Setup
* Player 1: human player
* Player 2: reinforcement learning AI
* Player 3: random AI
* Player 4: random AI

### Libraries
* Redux: frontend state management system
* Babel: compiler for ES6
* Webpack: build system
* Mocha: unit testing framework
* Math.js: Array and Matrix operations

### Notes
* [Redux Devtools](http://extension.remotedev.io/): for visualizing states and diff of states between each action.
* Webpack bundles all Javascript files into a single main.bundle.js file. For ease of debugging, the source files will be under webpack://src/ in the devtool panel.

### Game Rules
Some basic rules:
* 8-Princess (1): Lose if discarded
* 7-Countess (1): Discard if caught with King or Prince
* 6-King (1): Trade hands
* 5-Prince (2): One player discards his or her hand
* 4-Handmaid (2): Protection until your next turn
* 3-Baron (2): Compare hands; lower hand is out
* 2-Priest (2): Look at a hand
* 1-Guard (5): Guess a player's hand

You can find the full game rules [here](http://online.fliphtml5.com/mvgr/hyvg/#p=18).