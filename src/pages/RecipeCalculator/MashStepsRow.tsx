import React from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";

import { updateNewBeerMashSteps } from "../../store/recipes/actions";
import { selectNewRecipeMashSteps } from "../../store/recipes/selectors";
import { selectUserLanguage } from "../../store/user/selectors";

import { AdditionsInput } from "./Types";

interface Props {
  mashInputFields: AdditionsInput[];
  index: number;
}

export default function MashStepsRow(props: Props) {
  const dispatch = useDispatch();
  const userLanguage: Language = useSelector(selectUserLanguage);
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
            <Form.Label htmlFor="inlineFormInput">
              {translation[userLanguage][label]}
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder={placeholder}
              defaultValue={mashStep[param]}
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
