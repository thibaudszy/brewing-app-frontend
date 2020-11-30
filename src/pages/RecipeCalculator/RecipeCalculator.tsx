import React, { useEffect, useState } from "react";
import { Button, Col, Form, Jumbotron } from "react-bootstrap";
import translation from "./translation";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import { Range } from "./Types";
import {
  AddNewMaltToNewRecipe,
  getUserRecipes,
  removeNewMaltToNewRecipe,
  updateNewBeerData,
} from "../../store/recipes/actions";
import {
  selectMyRecipes,
  selectNewRecipeMaltAdditions,
} from "../../store/recipes/selectors";

import MaltAdditionsRow from "./MaltAdditionsRow";

import { maltAdditionInputFields, specifications } from "./Fields";

export default function RecipeCalculator() {
  const userLanguage: Language = useSelector(selectUserLanguage);

  const [numberOfHopAdditions, setNumberOfHopAdditions] = useState(1);
  const maltAdditions = useSelector(selectNewRecipeMaltAdditions);
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
  const numberOfMaltAdditions = maltAdditions.length;
  const decrementNumberOfMaltAdditions = () => {
    if (numberOfMaltAdditions > 1) {
      dispatch(removeNewMaltToNewRecipe());
    }
  };
  const incrementNumberOfMaltAdditions = () => {
    if (numberOfMaltAdditions < 15) {
      dispatch(AddNewMaltToNewRecipe());
    }
  };
  useEffect(() => {
    if (!numberOfMaltAdditions) {
      dispatch(AddNewMaltToNewRecipe());
    }
  }, []);

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
