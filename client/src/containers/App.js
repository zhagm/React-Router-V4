import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";

// Components and Containers
import Nav from "../components/Nav";
import NewRoomForm from "../components/NewRoomForm";
import CameraFaceDetector from "../components/CameraFaceDetector";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NotFoundPage from "./NotFoundPage";
import RoomsPage from "./RoomsPage";
import RoomPage from "./RoomPage";

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
      <Nav isAuthenticated={isAuthenticated} />
      <div id="main">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/rooms/new" component={NewRoomForm} />
          <Route exact path="/rooms" component={RoomsPage} />
          <Route path="/rooms/:id" component={RoomPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/">
            <h1>HOME</h1>
            <CameraFaceDetector />
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
