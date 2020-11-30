import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import translation from "./translation";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

import { getUserRecipes, updateNewBeerData } from "../../store/recipes/actions";
import { selectMyRecipes } from "../../store/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import emptyRecipe from "../RecipePage/emptyRecipe";
import MaltAdditionsRow from "./MaltAdditionsRow";
import { MaltAdditions, Range } from "./Types";

interface Specifications {
  param: Params;
  label: string;
  type: string;
  range: Range;
  placeholder: string;
}

export default function RecipeCalculator() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const [numberOfMaltAdditions, setNumberOfMaltAdditions] = useState(1);
  const [numberOfHopAdditions, setNumberOfHopAdditions] = useState(1);
  const history = useHistory();
  const {
    t_ABV,
    t_my_recipes,
    t_recipe_calculator,
    t_import_recipe,
    t_color,
    t_author,
    t_see_recipe,
  } = translation[userLanguage];
  const myRecipes = useSelector(selectMyRecipes) || [];
  const dispatch = useDispatch();

  const specifications: Specifications[] = [
    {
      param: "ABV",
      label: "t_ABV",
      type: "number",
      range: { min: 0, warningMin: 2, warningMax: 16, max: 30 },
      placeholder: "enter a value",
    },
    {
      param: "IBU",
      label: "t_IBU",
      type: "number",
      range: { min: 0, warningMin: 10, warningMax: 16, max: 30 },
      placeholder: "enter a value",
    },
    {
      param: "FGinPlato",
      label: "t_fg",
      type: "number",
      range: { min: 0, warningMin: 1, warningMax: 7, max: 25 },
      placeholder: "enter a value",
    },
    {
      param: "DesiredCarbonationInGramsPerLiter",
      label: "t_carbonation",
      type: "number",
      range: { min: 0, warningMin: 3, warningMax: 7, max: 10 },
      placeholder: "enter a value",
    },
    {
      param: "colorInEBC",
      label: "t_color",
      type: "number",
      range: { min: 0, warningMin: 3, warningMax: 100, max: 500 },
      placeholder: "enter a value",
    },
  ];
  const maltAdditionInputFields: MaltAdditions[] = [
    {
      param: "name",
      label: "t_malt_name",
      type: "string",
      range: { min: 2, warningMin: 4, warningMax: 20, max: 30 },
      placeholder: "enter a name",
    },
    {
      param: "percentageOfExtract",
      label: "t_percentage_extract",
      type: "number",
      range: { min: 0, warningMin: 0, warningMax: 100, max: 100 },
      placeholder: "enter a value",
    },
    {
      param: "defaultMoistureInPercentage",
      label: "t_moisture",
      type: "number",
      range: { min: 1, warningMin: 2, warningMax: 7, max: 10 },
      placeholder: "enter a value",
    },

    {
      param: " defaultColorInEBC",
      label: "t_color",
      type: "number",
      range: { min: 1, warningMin: 2, warningMax: 1500, max: 2000 },
      placeholder: "enter a value",
    },
  ];

  const handleFieldChange = (
    param: Params,
    data: any,
    type: string,
    range: Range
  ): void => {
    dispatch(updateNewBeerData(param, data));
  };
  const maltAdditionInput = (numberOfMalts: number) => {
    let toDisplay = [];
    for (let i = 0; i < numberOfMalts; i++) {
      toDisplay.push(
        <MaltAdditionsRow
          maltAdditionInputFields={maltAdditionInputFields}
          index={i}
          key={i}
        />
      );
    }
    return toDisplay;
  };
  const decrementNumberOfMaltAdditions = () => {
    if (numberOfMaltAdditions > 1) {
      setNumberOfMaltAdditions(numberOfMaltAdditions - 1);
    }
  };
  const incrementNumberOfMaltAdditions = () => {
    if (numberOfMaltAdditions < 15) {
      setNumberOfMaltAdditions(numberOfMaltAdditions + 1);
    }
  };
  return (
    <div>
      <Jumbotron fluid>
        <h2>{t_recipe_calculator}</h2>
      </Jumbotron>
      <div>
        <Form>
          <Form.Group>
            <h2>t_specifications</h2>
            <Form.Row className="align-items-center">
              {specifications.map(
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
          </Form.Group>
          <Form.Group>
            <h2>
              <Button
                onClick={() => {
                  decrementNumberOfMaltAdditions();
                }}
              >
                -
              </Button>{" "}
              t_malt_additions{" "}
              <Button
                onClick={() => {
                  incrementNumberOfMaltAdditions();
                }}
              >
                +
              </Button>
            </h2>
            {maltAdditionInput(numberOfMaltAdditions)}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
