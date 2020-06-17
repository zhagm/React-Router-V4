import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#121f3c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#36b7f4",
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
