import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuDrawer from "../components/navigation/MenuDrawer";
import "../styles/App.css";

/* COMPONENTS AND CONTAINERS */
import SplashPage from "./pages/SplashPage";
import AuthPage from "../containers/pages/AuthPage";
import MainNav from "../components/navigation/MainNav";
import NotFound from "./pages/NotFound";
import RoomPage from "./pages/RoomPage";
import RoomsPage from "./pages/RoomsPage";
import Logout from "../components/auth/Logout";

// Redux Imports
import { connect } from "react-redux";
import { loadUser } from "../redux/actions/authActions";
import store from "../redux/store";

// Socket IO
import { createSocketConnection } from "../redux/actions/socketActions";
import socketio from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_SERVER_URL ||
  "https://officeplace-server.herokuapp.com";

/**
 * Returns main app container, connects to server socket and loads user.
 * @function App
 * @param {bool} isAuthenticated - passed from redux connect.
 * @returns {div}
 */
function App({ isAuthenticated }) {
  useEffect(() => {
    const socket = socketio(SOCKET_URL);
    store.dispatch(createSocketConnection(socket));
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <div data-testid="component-app" className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/login" component={AuthPage} />
          <Route exact path="/register" component={AuthPage} />
          <Route exact path="/logout" component={Logout} />
          <Route>
            <div>
              <MainNav>
                <MenuDrawer />
              </MainNav>
              <div className="MainContainerBody">
                <Switch>
                  <Route exact path="/rooms" component={RoomsPage} />
                  <Route path="/rooms/:id" component={RoomPage} />
                  <Route path="/" component={NotFound} />
                </Switch>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
