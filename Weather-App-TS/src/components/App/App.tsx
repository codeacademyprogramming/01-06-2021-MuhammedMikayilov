import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Weather from "../Weather";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Weather />
        </Route>
      </Switch>
    </Router>
    // <div>Hello world</div>
  );
}

export default App;
