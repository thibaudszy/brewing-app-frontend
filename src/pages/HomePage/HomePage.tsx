import React from "react";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import "./HomePage.css";
import translation from "./translation";
import MyRecipesButton from "../../components/MyRecipesButton";

import RecipeCalculatorButton from "../../components/RecipeCalculatorButton";
import ExploreRecipesButton from "../../components/ExploreRecipesButton";

export default function HomePage() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_not_logged_in_message, t_logged_in_message } = translation[
    userLanguage
  ];
  const token = useSelector(selectToken);
  if (!token) {
    return (
      <div className="background">
        <h1 className="message">{t_logged_in_message}</h1>

        <h1 className="log-in-message"> {t_not_logged_in_message}</h1>
      </div>
    );
  }
  return (
    <div className="background">
      <h1 className="message">
        {t_logged_in_message}
        <h1>
          <MyRecipesButton />
          {"  "} <RecipeCalculatorButton /> {"  "} <ExploreRecipesButton />
        </h1>
      </h1>
    </div>
  );
}
