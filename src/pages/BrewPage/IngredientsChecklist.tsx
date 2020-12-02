import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Button, InputGroup, Tab, Table, Tabs } from "react-bootstrap";
import translation from "./translation";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";

import emptyRecipe from "../RecipePage/emptyRecipe";

import {
  calculateMaltQuantity,
  gristInKg,
  hopAdditionInGrams,
  mashWaterVolumeInL,
} from "../../BrewingCalculations";
import { selectFullRecipe } from "../../store/recipes/selectors";
import { selectBrew } from "../../store/brew/selectors";
import { updateBrew } from "../../store/brew/actions";

export default function IngredientsChecklist() {
  const recipe = useSelector(selectFullRecipe);
  const userLanguage: Language = useSelector(selectUserLanguage);
  //const dispatch = useDispatch();
  const brewLengthInL = useSelector(selectBrew).targetVolumeInLiters;
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
    t_dry_hops,
    t_yeast,
    t_ingredients,
    t_quantity,
    t_start_mash,
  } = translation[userLanguage];

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
  const boilAdditions = hopAdditions.filter(
    (hopAddition: HopAddition) => !hopAddition.isDryHop
  );
  const dryHopAdditions = hopAdditions.filter(
    (hopAddition: HopAddition) => hopAddition.isDryHop
  );
  const dispatch = useDispatch();
  const handleMashClick = () => {
    const now = new Date();
    dispatch(updateBrew("mash", "timeStartMash", now));
  };
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>{t_ingredients}</th>
            <th>{t_quantity}</th>
            <th>Check</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>{t_fermentables}</td>
          </tr>

          {maltAdditions.map((maltAddition: MaltAddition) => (
            <tr key={maltAddition.id}>
              <td>{maltAddition.name}</td>
              <td>
                {`${calculateMaltQuantity(
                  OGinPlato,
                  maltAddition.percentageOfExtract,
                  maltAddition.defaultMoistureInPercentage,
                  brewLengthInL
                )} kg`}
              </td>
              <td>
                <InputGroup.Checkbox />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>{t_hop_additions}</td>
          </tr>

          {boilAdditions.map((hopAddition: HopAddition) => (
            <tr key={hopAddition.id}>
              <td>{hopAddition.name}</td>
              <td>
                {`${hopAdditionInGrams(
                  IBU,
                  //@ts-ignore
                  hopAddition.percentageAlphaAcidsFromAddition,
                  hopAddition.timeOfAdditionInMinBeforeEndOfBoil,
                  hopAddition.alphaAcidContent,
                  brewLengthInL
                ).toFixed(0)} g`}
              </td>
              <td>
                <InputGroup.Checkbox />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>{t_yeast}</td>
          </tr>
          <tr>
            <td>{yeastStrain}</td>
            <td>{`${PitchRateInGramsperLiter * brewLengthInL} g`}</td>
            <td>
              <InputGroup.Checkbox />
            </td>
          </tr>
          {dryHopAdditions.length > 0 ? (
            <tr>
              <td colSpan={3}>{t_dry_hops}</td>
            </tr>
          ) : null}

          {dryHopAdditions.map((hopAddition: HopAddition) => (
            <tr key={hopAddition.id}>
              <td>{hopAddition.name}</td>
              <td>
                {`${hopAddition.dryHopRateInGramsPerLitre * brewLengthInL} g`}
              </td>
              <td>
                <InputGroup.Checkbox />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="warning" onClick={() => handleMashClick()}>
        {t_start_mash}
      </Button>
    </div>
  );
}
