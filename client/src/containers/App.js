import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";

// Components and Containers
import Footer from "../components/general/Footer";
import Logout from "../components/authentication/Logout";
import Navbar from "../components/general/Navbar";
import AuthPage from "./AuthPage";
import NotFoundPage from "./NotFoundPage";
import RoomPage from "./RoomPage";
import RoomsPage from "./RoomsPage";
import SplashPage from "./SplashPage";

// Redux Imports
import { loadUser } from "../actions/authActions";
import { connect } from "react-redux";
import store from "../store";

// Socket IO
import { createSocketConnection } from "../actions/socketActions";
import socketio from "socket.io-client";
const SOCKET_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    const socket = socketio(SOCKET_URL);
    store.dispatch(createSocketConnection(socket));
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div id="main">
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/dashboard" component={RoomsPage} />
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/rooms/:id" component={RoomPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
