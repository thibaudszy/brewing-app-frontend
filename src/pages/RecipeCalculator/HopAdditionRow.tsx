import React from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";

import { updateNewBeerHopAdditions } from "../../store/recipes/actions";
import { selectNewRecipeBoilHopAdditions } from "../../store/recipes/selectors";
import { selectUserLanguage } from "../../store/user/selectors";

import { AdditionsInput } from "./Types";

interface Props {
  hopAdditionInputFields: AdditionsInput[];
  index: number;
}

export default function HopAdditionsRow(props: Props) {
  const dispatch = useDispatch();
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { hopAdditionInputFields, index } = props;
  const hopAddition = useSelector(selectNewRecipeBoilHopAdditions)[index];

  const handleHopAdditionInput = (
    index: number,
    key: any,
    value: any
  ): void => {
    dispatch(updateNewBeerHopAdditions(index, key, value, false));
  };
  return (
    <Form.Row className="align-items-center">
      {hopAdditionInputFields.map(
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
                defaultValue={hopAddition[param]}
                onChange={(e) =>
                  handleHopAdditionInput(index, param, e.target.value)
                }
              />
            </Col>
          );
        }
      )}
    </Form.Row>
  );
}
