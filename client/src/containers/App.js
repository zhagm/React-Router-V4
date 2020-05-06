import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";

// Components and Containers
import Nav from "../components/Nav";
import NewRoomForm from "../components/NewRoomForm";
import VideoPage from "../components/VideoPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NotFoundPage from "./NotFoundPage";
import ChatPage from "./ChatPage";
import RoomsPage from "./RoomsPage";
import RoomPage from "./RoomPage";

// Redux Imports
import { loadUser } from "../actions/authActions";
import { connect } from "react-redux";
import store from "../store";

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} />
      <div id="main">
        <Switch>
          <Route path="/login" component={LoginPage} />
          {/* <PrivateRoute
            path="/chat"
            comp={ChatPage}
            isAuthenticated={isAuthenticated}
          /> */}
          <Route path="/chat" component={ChatPage} />
          <Route exact path="/rooms/new" component={NewRoomForm} />
          <Route exact path="/rooms" component={RoomsPage} />
          <Route path="/rooms/:id" component={RoomPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/">
            <h1>HOME</h1>
            <VideoPage />
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
