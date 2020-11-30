import React from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  updateNewBeerArrays,
  updateNewBeerHopAdditions,
  updateNewBeerMashSteps,
} from "../../store/recipes/actions";
import {
  selectNewRecipeHopAdditions,
  selectNewRecipeMaltAdditions,
  selectNewRecipeMashSteps,
} from "../../store/recipes/selectors";
import { hopAdditionInputFields } from "./Fields";
import { AdditionsInput, Range } from "./Types";

interface Props {
  mashInputFields: AdditionsInput[];
  index: number;
}

export default function MashStepsRow(props: Props) {
  const dispatch = useDispatch();

  const { mashInputFields, index } = props;
  const mashStep = useSelector(selectNewRecipeMashSteps)[index];

  const handleMashStepInput = (index: number, key: any, value: any): void => {
    dispatch(updateNewBeerMashSteps(index, key, value));
  };
  return (
    <Form.Row className="align-items-center">
      {mashInputFields.map(({ param, label, type, range, placeholder }) => {
        return (
          <Col xs="auto" key={param}>
            <Form.Label htmlFor="inlineFormInput">{label}</Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder={placeholder}
              // defaultValue={hopAddition[param]}
              onChange={(e) =>
                handleMashStepInput(index, param, e.target.value)
              }
            />
          </Col>
        );
      })}
    </Form.Row>
  );
}
