import React, { useEffect } from "react";

import { Switch, Route, useHistory } from "react-router-dom";
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
import { getUserWithStoredToken } from "./store/user/actions";
import { useSelector, useDispatch } from "react-redux";
import MessageBox from "./components/MessageBox";
import { selectAppLoading } from "./store/appState/selectors";
import Loading from "./components/Loader";
import RecipeCalculator from "./pages/RecipeCalculator/RecipeCalculator";
import BrewPage from "./pages/BrewPage/BrewPage";
import { Button } from "react-bootstrap";

function App() {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectAppLoading);
  const history = useHistory();

  useEffect(() => {
    // if the user reloads the app, we fetch his data from the server.
    if (!userId && token) {
      dispatch(getUserWithStoredToken());
    }
  });
  const Error404 = () => (
    <div
      className="Error404"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        It seems you got lost. This page does not exist
      </h1>
      <img
        src="https://i.kym-cdn.com/photos/images/original/001/042/619/4ea.jpg"
        alt="John Travolta lost"
      />
      <Button
        onClick={() => {
          history.push("/");
        }}
        style={{ margin: "1em" }}
      >
        {" "}
        Go to the home page
      </Button>
    </div>
  );
  return (
    <div className="App">
      <AppNavbar />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <div className="Body">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route exact path="/recipes" component={MyRecipes} />
          <Route exact path="/explore-recipes" component={ImportRecipes} />
          <Route path="/recipes/:recipeId" component={RecipePage} />
          <Route path="/recipe-calculator" component={RecipeCalculator} />
          <Route path="/brew" component={BrewPage} />
          <Route component={Error404} />
        </Switch>
      </div>

      <MyFooter />
    </div>
  );
}

export default App;
