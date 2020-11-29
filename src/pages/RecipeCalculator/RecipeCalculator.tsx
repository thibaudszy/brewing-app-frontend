import React, { useEffect } from "react";
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

import { getUserRecipes } from "../../store/recipes/actions";
import { selectMyRecipes } from "../../store/recipes/selectors";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import emptyRecipe from "../RecipePage/emptyRecipe";

export default function RecipeCalculator() {
  const userLanguage: Language = useSelector(selectUserLanguage);
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

  const specifications = [
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
  return (
    <div>
      <Jumbotron fluid>
        <h2>{t_recipe_calculator}</h2>
      </Jumbotron>
      <div>
        <h2>t_specifications</h2>
        <Form>
          <Form.Group>
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
                      />
                    </Col>
                  );
                }
              )}
            </Form.Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
