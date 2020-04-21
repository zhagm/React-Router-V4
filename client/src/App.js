import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components and pages
import Nav from "./components/Nav";
import "./App.css";
import UsersPage from "./pages/UsersPage";
import ItemsPage from "./pages/ItemsPage";

// Redux imports
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

const App = () => {
  useEffect(() => {
    // load user if authenticated
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div id="appWrapper">
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
    </Provider>
  );
};

export default App;
