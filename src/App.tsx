import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/Navbar/AppNavbar";
import Login from "./pages/Login/Login";

import MyFooter from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import RecipePage from "./pages/RecipePage/RecipePage";
import ImportRecipes from "./pages/ImportRecipes/ImportRecipes";
import { selectToken, selectUserId } from "./store/user/selectors";
import { useSelector } from "react-redux";
import MessageBox from "./components/MessageBox";

function App() {
  const token = useSelector(selectToken);
  const history = useHistory();
  const userId = useSelector(selectUserId);
  //TO DO: if no token -> homePage
  //TO DO: if no userId, send request to api/me
  return (
    <div className="App">
      <AppNavbar />
      <MessageBox />

      <div className="Body">
        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route exact path="/recipes" component={MyRecipes} />
          <Route exact path="/explore-recipes" component={ImportRecipes} />
          <Route path="/recipes/:recipeId" component={RecipePage} />
          {/* <Route path="/" component={Error404} /> */}
        </Switch>
      </div>

      <MyFooter />
    </div>
  );
}

export default App;
