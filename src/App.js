import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/assets/css/app.css";
import Home from "./pages/home";

function App() {
	return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
