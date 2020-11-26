import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/Navbar/AppNavbar";
import Login from "./pages/Login/Login";

import MyFooter from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div className="Body">
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}

          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          {/* <Route path="/" component={Error404} /> */}
        </Switch>
      </div>

      <MyFooter />
    </div>
  );
}

export default App;
