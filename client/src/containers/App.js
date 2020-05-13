import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";

// Components and Containers
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewRoomForm from "../components/NewRoomForm";
import NotFoundPage from "./NotFoundPage";
import RoomsPage from "./RoomsPage";
import RoomPage from "./RoomPage";
import SplashPage from "./SplashPage";
import AuthPage from "./AuthPage";

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
          <Route path="/login" component={AuthPage} />
          <Route path="/register" component={AuthPage} />
          <Route exact path="/rooms/new" component={NewRoomForm} />
          <Route exact path="/dashboard" component={RoomsPage} />
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
