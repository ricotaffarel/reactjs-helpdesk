import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
  return (
    <div class="wrapper">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
