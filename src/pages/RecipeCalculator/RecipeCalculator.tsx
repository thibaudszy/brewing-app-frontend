import React, { useEffect } from "react";
import { Button, Col, Form, FormControl, Jumbotron } from "react-bootstrap";
import translation from "./translation";

import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import { Range } from "./Types";
import {
  AddNewMaltToNewRecipe,
  removeNewHopFromNewRecipe,
  AddNewHopToNewRecipe,
  removeNewMaltToNewRecipe,
  updateNewBeerData,
  removeMashStepFromNewRecipe,
  AddNewMashStepToNewRecipe,
  updateComment,
  submitNewRecipe,
} from "../../store/recipes/actions";
import {
  selectNewRecipeMaltAdditions,
  selectNewRecipeBoilHopAdditions,
  selectNewRecipeMashSteps,
  selectNewRecipe,
} from "../../store/recipes/selectors";

import MaltAdditionsRow from "./MaltAdditionsRow";

import {
  hopAdditionInputFields,
  maltAdditionInputFields,
  specifications,
  mashInputFields,
  aboutData,
} from "./Fields";
import HopAdditionsRow from "./HopAdditionRow";
import MashStepsRow from "./MashStepsRow";
import FermentationFormGroup from "./FermentationFormGroup";
import "./RecipeCalculator.css";

export default function RecipeCalculator() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const maltAdditions = useSelector(selectNewRecipeMaltAdditions);
  const hopAdditions = useSelector(selectNewRecipeBoilHopAdditions);
  const mashSteps = useSelector(selectNewRecipeMashSteps);
  const newRecipe = useSelector(selectNewRecipe);
  const {
    t_recipe_calculator,
    t_about_your_beer,
    t_specifications,
    t_malt_additions,
    t_hop_additions,
    t_mash_steps,
    t_comments,
  } = translation[userLanguage];

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
  const hopAdditionInput = (numberOfHopAdditions: number) => {
    let toDisplay = [];
    for (let i = 0; i < numberOfHopAdditions; i++) {
      toDisplay.push(
        <HopAdditionsRow
          hopAdditionInputFields={hopAdditionInputFields}
          index={i}
          key={i}
        />
      );
    }
    return toDisplay;
  };

  const mashStepsInput = (numberOfmashSteps: number) => {
    let toDisplay = [];
    for (let i = 0; i < numberOfMashSteps; i++) {
      toDisplay.push(
        <MashStepsRow mashInputFields={mashInputFields} index={i} key={i} />
      );
    }
    return toDisplay;
  };
  const numberOfMaltAdditions = maltAdditions.length;
  const numberOfHopAdditions = hopAdditions.length;
  const numberOfMashSteps = mashSteps.length;
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
  const decrementNumberOfHopAdditions = () => {
    if (numberOfHopAdditions > 1) {
      dispatch(removeNewHopFromNewRecipe(false));
    }
  };
  const incrementNumberOfHopAdditions = () => {
    if (numberOfHopAdditions < 15) {
      dispatch(AddNewHopToNewRecipe(false));
    }
  };
  const decrementNumberOfMashSteps = () => {
    if (numberOfMashSteps > 1) {
      dispatch(removeMashStepFromNewRecipe());
    }
  };
  const incrementNumberOfMashSteps = () => {
    if (numberOfMashSteps < 15) {
      dispatch(AddNewMashStepToNewRecipe());
    }
  };
  const handleCommentsInput = (comment: string) => {
    dispatch(updateComment(comment));
  };
  useEffect(() => {
    if (!numberOfMaltAdditions) {
      dispatch(AddNewMaltToNewRecipe());
    }
    if (!numberOfHopAdditions) {
      dispatch(AddNewHopToNewRecipe(false));
    }
    if (!numberOfMashSteps) {
      dispatch(AddNewMashStepToNewRecipe());
    }
  });
  function handleSubmit(event: any) {
    event.preventDefault();
    dispatch(submitNewRecipe(newRecipe));
  }
  return (
    <div>
      <Jumbotron fluid>
        <h2>{t_recipe_calculator}</h2>
      </Jumbotron>
      <div>
        <Form className="calculator">
          <Form.Group className="form-group">
            <h2>{t_about_your_beer}</h2>
            <Form.Row className="align-items-center">
              {aboutData.map(
                ({ param, label, type, range, placeholder }, index) => {
                  return (
                    <Col xs={index + 2} key={param}>
                      <Form.Label htmlFor="inlineFormInput">
                        {translation[userLanguage][label]}
                      </Form.Label>
                      <Form.Control
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder={placeholder}
                        // @ts-ignore
                        defaultValue={newRecipe[param]}
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
            <h2>{t_specifications}</h2>
            <Form.Row className="align-items-center">
              {specifications.map(
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
                        // @ts-ignore
                        defaultValue={newRecipe[param]}
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
              {t_malt_additions}{" "}
              <Button
                onClick={() => {
                  decrementNumberOfMaltAdditions();
                }}
              >
                -
              </Button>{" "}
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
          <Form.Group>
            <h2>
              {t_hop_additions}{" "}
              <Button
                onClick={() => {
                  decrementNumberOfHopAdditions();
                }}
              >
                -
              </Button>{" "}
              <Button
                onClick={() => {
                  incrementNumberOfHopAdditions();
                }}
              >
                +
              </Button>
            </h2>
            {hopAdditionInput(numberOfHopAdditions)}
          </Form.Group>
          <Form.Group>
            <h2>
              {t_mash_steps}{" "}
              <Button
                onClick={() => {
                  decrementNumberOfMashSteps();
                }}
              >
                -
              </Button>{" "}
              <Button
                onClick={() => {
                  incrementNumberOfMashSteps();
                }}
              >
                +
              </Button>
            </h2>
            {mashStepsInput(numberOfMashSteps)}
          </Form.Group>

          <FermentationFormGroup />
          <Form.Group>
            <h2>{t_comments}</h2>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              onChange={(e) => handleCommentsInput(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            style={{ width: "5em", alignSelf: "center", margin: "1em" }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
