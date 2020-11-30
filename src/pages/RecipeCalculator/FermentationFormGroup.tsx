import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  AddNewHopToNewRecipe,
  removeNewHopFromNewRecipe,
  updateNewBeerArrays,
  updateNewBeerData,
  updateNewBeerHopAdditions,
  updateNewBeerMashSteps,
} from "../../store/recipes/actions";
import {
  selectNewRecipefermentatioData,
  selectNewRecipeBoilHopAdditions,
} from "../../store/recipes/selectors";
import {
  dryHopsInputFields,
  fermentationDataInputFields,
  hopAdditionInputFields,
} from "./Fields";
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
  const handleHopAdditionInput = (
    index: number,
    key: any,
    value: any
  ): void => {
    dispatch(updateNewBeerHopAdditions(index, key, value));
  };
  const handleFieldChange = (
    param: Params,
    data: any,
    type: string,
    range: Range
  ): void => {
    dispatch(updateNewBeerData(param, data));
  };
  const decrementNumberOfDryHops = () => {
    if (numberOfDryHops) {
      dispatch(removeNewHopFromNewRecipe(true));
    }
  };
  const incrementNumberOfDryHops = () => {
    if (numberOfDryHops < 15) {
      dispatch(AddNewHopToNewRecipe(true));
    }
  };
  const DryHopsInput = (numberOfDryHops: number) => {
    let toDisplay = [];

    for (let i = 0; i < numberOfDryHops; i++) {
      //const { param, label, placeholder, type, range } = dryHopsInputFields[i];
      toDisplay.push(
        <Form.Row className="align-items-center" key={i}>
          {dryHopsInputFields.map(
            ({ param, label, type, range, placeholder }) => {
              return (
                <Col xs="auto" key={param}>
                  <Form.Label htmlFor="inlineFormInput">{label}</Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={placeholder}
                    // defaultValue={hopAddition[param]}
                    onChange={(e) =>
                      handleHopAdditionInput(i, param, e.target.value)
                    }
                  />
                </Col>
              );
            }
          )}
        </Form.Row>
      );
    }
    return toDisplay;
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
      {!numberOfDryHops ? (
        <Button onClick={() => incrementNumberOfDryHops()}>
          {" "}
          t_add_dry_hop_additions
        </Button>
      ) : (
        " "
      )}
      <h2>
        <Button
          onClick={() => {
            decrementNumberOfDryHops();
          }}
        >
          -
        </Button>{" "}
        t_dry_hops{" "}
        <Button
          onClick={() => {
            incrementNumberOfDryHops();
          }}
        >
          +
        </Button>
      </h2>
      {DryHopsInput(numberOfDryHops)}
    </Form.Group>
  );
}
