import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./context/AuthContext";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
