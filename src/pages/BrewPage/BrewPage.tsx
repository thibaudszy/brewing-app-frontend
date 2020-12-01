import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Button, Tab, Table, Tabs } from "react-bootstrap";
import translation from "./translation";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";

import emptyRecipe from "../RecipePage/emptyRecipe";

import { gristInKg, mashWaterVolumeInL } from "../../BrewingCalculations";
import { selectFullRecipe } from "../../store/recipes/selectors";
import IngredientsChecklist from "./IngredientsChecklist";
import { selectBrew, selectBrewStage } from "../../store/brew/selectors";
import { fetchLastbrew } from "../../store/brew/actions";
import { fetchFullRecipe } from "../../store/recipes/actions";

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
  }, [stage, brew, recipe]);
  if (!brew || !recipe) {
    return <div> loading</div>;
  }

  const { t_ingredients } = translation[userLanguage];

  const {
    description,
    ABV,
    IBU,
    OGinPlato,
    FGinPlato,
    colorInEBC,
    DesiredCarbonationInGramsPerLiter,
    mashSteps,
    hopAdditions,
    BoilDurationInMin,
    LiquorToGristRatio,
    maltAdditions,
    FermentationTemperature,
    PitchRateInGramsperLiter,
    yeastStrain,
    comments,
  } = recipe;

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="ingredients" title={t_ingredients}>
          <IngredientsChecklist />
        </Tab>

        <Tab eventKey="mash" title="Mash">
          {/* <MashTimers /> */}
        </Tab>
        <Tab eventKey="boil" title="Boil" disabled></Tab>
      </Tabs>
    </div>
  );
}
