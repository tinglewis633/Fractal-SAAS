import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Place from "./Place";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>

        <Route path="/places/:id">
          <Place />
        </Route>

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);