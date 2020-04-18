import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import "./App.css";
import UsersPage from "./pages/UsersPage";
import ItemsPage from "./pages/ItemsPage";

const App = () => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/about">
            <h1>ABOUT</h1>
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/items">
            <ItemsPage />
          </Route>
          <Route path="/">
            <h1>HOME</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
