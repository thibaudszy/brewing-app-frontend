import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  updateNewBeerArrays,
  updateNewBeerData,
  updateNewBeerHopAdditions,
  updateNewBeerMashSteps,
} from "../../store/recipes/actions";
import {
  selectNewRecipefermentatioData,
  selectNewRecipeBoilHopAdditions,
} from "../../store/recipes/selectors";
import { fermentationDataInputFields, hopAdditionInputFields } from "./Fields";
import { AdditionsInput, Range } from "./Types";

export default function FermentationFormGroup() {
  const dispatch = useDispatch();

  const {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    dryHops,
  } = useSelector(selectNewRecipefermentatioData);
  const numberOfDryHops = dryHops.length;
  console.log(dryHops);
  const handleMashStepInput = (index: number, key: any, value: any): void => {
    dispatch(updateNewBeerMashSteps(index, key, value));
  };
  const handleFieldChange = (
    param: Params,
    data: any,
    type: string,
    range: Range
  ): void => {
    dispatch(updateNewBeerData(param, data));
  };

  return (
    <Form.Group>
      <h2> {"t_fermentation"} </h2>
      <Form.Row className="align-items-center">
        {fermentationDataInputFields.map(
          ({ param, label, type, range, placeholder }) => {
            return (
              <Col xs="auto" key={param}>
                <Form.Label htmlFor="inlineFormInput">{label}</Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder={placeholder}
                  onChange={(e) =>
                    handleFieldChange(
                      param,
                      { index: null, values: e.target.value },
                      type,
                      range
                    )
                  }
                />
              </Col>
            );
          }
        )}
      </Form.Row>
      {!numberOfDryHops ? <Button> t_add_dry_hop_additions</Button> : " "}
      {/* <h2>
    <Button
      onClick={() => {
        decrementNumberOfMashSteps();
      }}
    >
      -
    </Button>{" "}
    t_mash_steps{" "}
    <Button
      onClick={() => {
        incrementNumberOfMashSteps();
      }}
    >
      +
    </Button>
  </h2>
  {mashStepsInput(numberOfMashSteps)} */}
    </Form.Group>
  );
}
