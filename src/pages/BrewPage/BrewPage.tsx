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

export default function BrewPage() {
  const recipe = useSelector(selectFullRecipe);
  const userLanguage: Language = useSelector(selectUserLanguage);
  //const dispatch = useDispatch();

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
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="ingredients" title={t_ingredients}>
          <IngredientsChecklist />
        </Tab>

        <Tab eventKey="mash" title="Mash"></Tab>
        <Tab eventKey="boil" title="Boil" disabled></Tab>
      </Tabs>
    </div>
  );
}
