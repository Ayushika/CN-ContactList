/** @format */

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddUser from "./Components/AddUser";
import UpdateUser from "./Components/UpdateUser";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/adduser' component={AddUser} />
        <Route exact path='/updateuser/:id' component={UpdateUser} />
      </Switch>
    </Router>
  );
};

export default App;
