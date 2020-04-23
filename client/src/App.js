import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";

// Components and Containers
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import UsersPage from "./containers/UsersPage";
import ItemsPage from "./containers/ItemsPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import NotFoundPage from "./containers/NotFoundPage";

// Redux imports
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";
import store from "./store";

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    // load user if authenticated
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} />
      <div id="main">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/users"
            comp={UsersPage}
            isAuthenticated={isAuthenticated}
          />
          <Route path="/items" component={ItemsPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/">
            <h1>HOME</h1>
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
