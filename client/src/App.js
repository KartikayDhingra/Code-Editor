import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
    </React.Fragment>
  );
}

export default App;
