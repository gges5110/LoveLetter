import React from "react";
import { Component } from "react";

import CardSelect from "../containers/card_select";
import SimpleTabs from "./SimpleTabs";
// import GameBoard from "../containers/game_board";

export default class App extends Component {
  render() {
    return (
      <div>
        <SimpleTabs />
        {/*<CardSelect />*/}
        {/*<GameBoard />*/}
      </div>
    );
  }
}