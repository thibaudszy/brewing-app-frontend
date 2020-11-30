import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { updateNewBeerArrays } from "../../store/recipes/actions";
import { MaltAdditionsInput, Range } from "./Types";

interface Props {
  maltAdditionInputFields: MaltAdditionsInput[];
  index: number;
}

export default function MaltAdditionsRow(props: Props) {
  const dispatch = useDispatch();

  const { maltAdditionInputFields, index } = props;
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
              <Form.Label htmlFor="inlineFormInput">{label}</Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder={placeholder}
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
