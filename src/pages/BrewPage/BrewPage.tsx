import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Col,
  Form,
  Jumbotron,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import translation from "./translation";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";

import { apiUrl } from "../../config/constants";

import { appDoneLoading, appLoading } from "../../store/appState/actions";
import Axios, { AxiosResponse } from "axios";
import emptyRecipe from "../RecipePage/emptyRecipe";

import { gristInKg, mashWaterVolumeInL } from "../../BrewingCalculations";

export default function BrewPage() {
  const [recipe, setRecipe] = useState<FullRecipe>(emptyRecipe);
  const [brewLengthInL, setBrewLengthInL] = useState<number>(20);
  const userLanguage: Language = useSelector(selectUserLanguage);
  const dispatch = useDispatch();
  interface paramsRecipePage {
    recipeId: string;
  }
  const {
    t_enter_your_brewlength,
    t_fermentables,
    t_specifications,
    t_hop_additions,
    t_mash_schedule,
    t_mash_into,
    t_boil_duration,
    t_fermentation_temperature,
    t_fermentation,
    t_yeast_strain,
    t_pitch_rate,
    t_comments,
    t_description,
  } = translation[userLanguage];

  const { recipeId } = useParams<paramsRecipePage>();
  const token = useSelector(selectToken);
  useEffect(() => {}, [recipeId, dispatch]);

  const handleBrewLengthInput = (inputValue: string) => {
    if (inputValue) {
      if (!/^\d+$/.test(inputValue)) {
        return;
      }
    }

    const inputValueAsNumber = parseInt(inputValue);

    if (inputValueAsNumber >= 0) {
      setBrewLengthInL(inputValueAsNumber);
    }
    if (isNaN(inputValueAsNumber)) {
      setBrewLengthInL(0);
    }
  };

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
  const mashVolumeAsString = () => {
    const volume = mashWaterVolumeInL(
      LiquorToGristRatio,
      gristInKg(OGinPlato, brewLengthInL, maltAdditions)
    );
    return volume.toFixed(volume > 50 ? 0 : 1);
  };
  console.log(recipe);

  return (
    <div>
      <Jumbotron>
        <h1>{BrewPage}</h1>
      </Jumbotron>
    </div>
  );
}
