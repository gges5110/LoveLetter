import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";

import GameReducer from "../reducers/reducer_game";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {blue, orange} from "@material-ui/core/colors";
import Page from "../components/Page";

let store = createStore(combineReducers({GameReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export {
  store
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  palette: {
    primary: blue,
    secondary: orange,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Page />
    </Provider>
  </MuiThemeProvider>  ,
  document.querySelector("#app")
);
