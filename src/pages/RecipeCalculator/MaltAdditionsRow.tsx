import React from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import translation from "./translation";

import { updateNewBeerArrays } from "../../store/recipes/actions";
import { selectNewRecipeMaltAdditions } from "../../store/recipes/selectors";
import { selectUserLanguage } from "../../store/user/selectors";
import { AdditionsInput, Range } from "./Types";

interface Props {
  maltAdditionInputFields: AdditionsInput[];
  index: number;
}

export default function MaltAdditionsRow(props: Props) {
  const dispatch = useDispatch();
  const userLanguage: Language = useSelector(selectUserLanguage);
  const { maltAdditionInputFields, index } = props;
  const maltAddition = useSelector(selectNewRecipeMaltAdditions)[index];

  const handleMaltAdditionInput = (
    key: any,
    value: any,
    type: string,
    range: Range
  ): void => {
    dispatch(updateNewBeerArrays("maltAdditions", index, key, value));
  };
  return (
    <Form.Row className="align-items-center">
      {maltAdditionInputFields.map(
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
                defaultValue={maltAddition[param]}
                onChange={(e) =>
                  handleMaltAdditionInput(param, e.target.value, type, range)
                }
              />
            </Col>
          );
        }
      )}
    </Form.Row>
  );
}
