import React, { Component } from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
