import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers";
import './App.css';
import './style.css';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducers from "./redux/reducers";
let store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
