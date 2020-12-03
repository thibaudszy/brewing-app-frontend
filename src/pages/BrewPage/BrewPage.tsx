import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Jumbotron, Tab, Tabs } from "react-bootstrap";
import translation from "./translation";
import { selectUserLanguage } from "../../store/user/selectors";
import { selectFullRecipe } from "../../store/recipes/selectors";
import IngredientsChecklist from "./IngredientsChecklist";
import { selectBrew, selectBrewStage } from "../../store/brew/selectors";
import { fetchLastbrew, updateBrew } from "../../store/brew/actions";
import { fetchFullRecipe } from "../../store/recipes/actions";
import MashTimers from "./MashTimers";
import Boil from "./Boil";
import FermentationTab from "./FermentationTab";
import "./BrewPage.css";

export default function BrewPage() {
  const recipe = useSelector(selectFullRecipe);
  const brew = useSelector(selectBrew);
  const stage = useSelector(selectBrewStage);
  const [key, setKey] = useState<string | null>("ingredients");
  const userLanguage: Language = useSelector(selectUserLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    setKey(stage);

    if (!brew.id) {
      dispatch(fetchLastbrew());
    }
    if (brew.id && !recipe) {
      dispatch(fetchFullRecipe(brew.recipeId));
    }
  }, [stage, brew, recipe, dispatch]);
  if (!brew || !recipe) {
    return <div> loading</div>;
  }

  const { t_ingredients } = translation[userLanguage];

  const { IBU, name, BoilDurationInMin } = recipe;
  const finishMashHandler = () => {
    dispatch(updateBrew("boil", "timeStartFiltration", new Date()));
  };
  return (
    <div className="brewpage">
      <Jumbotron>
        <h1> {name} </h1>
      </Jumbotron>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="ingredients" title={t_ingredients}>
          <IngredientsChecklist />
        </Tab>

        <Tab eventKey="mash" title="Mash">
          <MashTimers />
          <Button onClick={() => finishMashHandler()}> Mash Finished </Button>
        </Tab>
        <Tab eventKey="boil" title="Boil">
          <Boil
            IBU={IBU}
            brewLengthInL={brew.targetVolumeInLiters}
            BoilDurationInMin={BoilDurationInMin}
          />
        </Tab>
        <Tab eventKey="fermentation" title="Fermentation">
          <FermentationTab />
        </Tab>
      </Tabs>
    </div>
  );
}
