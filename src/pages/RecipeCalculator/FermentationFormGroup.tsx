import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  AddNewHopToNewRecipe,
  removeNewHopFromNewRecipe,
  updateNewBeerData,
  updateNewBeerHopAdditions,
} from "../../store/recipes/actions";
import { selectNewRecipefermentatioData } from "../../store/recipes/selectors";
import translation from "./translation";
import { dryHopsInputFields, fermentationDataInputFields } from "./Fields";
import { Range } from "./Types";
import { selectUserLanguage } from "../../store/user/selectors";

export default function FermentationFormGroup() {
  const dispatch = useDispatch();
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_fermentation, t_add_dry_hop_additions, t_dry_hops } = translation[
    userLanguage
  ];

  const {
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
    dryHops,
  } = useSelector(selectNewRecipefermentatioData);
  const numberOfDryHops = dryHops.length;

  const handleHopAdditionInput = (
    index: number,
    key: any,
    value: any
  ): void => {
    dispatch(updateNewBeerHopAdditions(index, key, value, true));
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
      const dryHopAddition = dryHops[i];
      toDisplay.push(
        <Form.Row className="align-items-center" key={i}>
          {dryHopsInputFields.map(
            ({ param, label, type, range, placeholder }) => {
              return (
                <Col xs="auto" key={param}>
                  <Form.Label htmlFor="inlineFormInput">
                    {translation[userLanguage][label]}
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={placeholder}
                    defaultValue={dryHopAddition[param]}
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
  const defaultValues = [
    yeastStrain,
    PitchRateInGramsperLiter,
    FermentationTemperature,
  ];
  return (
    <Form.Group>
      <h2> {t_fermentation} </h2>
      <Form.Row className="align-items-center">
        {fermentationDataInputFields.map(
          ({ param, label, type, range, placeholder }, index) => {
            return (
              <Col xs="auto" key={param}>
                <Form.Label htmlFor="inlineFormInput">
                  {translation[userLanguage][label]}
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder={placeholder}
                  defaultValue={defaultValues[index]}
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
        <Button
          onClick={() => incrementNumberOfDryHops()}
          style={{ marginTop: "0.5em" }}
        >
          {" "}
          {t_add_dry_hop_additions}
        </Button>
      ) : (
        <div>
          <h2>
            {t_dry_hops}{" "}
            <Button
              onClick={() => {
                decrementNumberOfDryHops();
              }}
            >
              -
            </Button>{" "}
            <Button
              onClick={() => {
                incrementNumberOfDryHops();
              }}
            >
              +
            </Button>
          </h2>
          {DryHopsInput(numberOfDryHops)}
        </div>
      )}
    </Form.Group>
  );
}
