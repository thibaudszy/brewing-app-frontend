import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Jumbotron,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import translation from "./translation";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";

import { apiUrl, DEFAULT_BREWING_EFFICIENCY } from "../../config/constants";
import SpecificationTable from "./SpecificationTable";
import { appDoneLoading, appLoading } from "../../store/appState/actions";
import Axios, { AxiosResponse } from "axios";
import emptyRecipe from "./emptyRecipe";

export default function RecipePage() {
  const [recipe, setRecipe] = useState<FullRecipe>(emptyRecipe);
  const [brewLengthInL, setBrewLengthInL] = useState<number>(20);
  const userLanguage: Language = useSelector(selectUserLanguage);
  const dispatch = useDispatch();
  interface paramsRecipePage {
    recipeId: string;
  }
  const {
    t_enter_your_brewlength,
    t_fermentables,
    t_type,
    t_percentageOfExtract,
    t_quantity,
    t_specifications,
  } = translation[userLanguage];

  const { recipeId } = useParams<paramsRecipePage>();
  const token = useSelector(selectToken);
  useEffect(() => {
    const fetchRecipe = async (recipeIdLocal: string) => {
      dispatch(appLoading());

      try {
        const recipeRequest: AxiosResponse = await Axios.get(
          `${apiUrl}/recipes/recipe/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(appDoneLoading());
        const recipe: FullRecipe = recipeRequest.data;
        setRecipe(recipe);
      } catch (e) {
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            variant: "danger",
            dismissable: true,
            text: "request failed",
          },
        });
      }
    };
    fetchRecipe(recipeId);
  }, [recipeId, dispatch]);

  if (!recipe.id) {
    return <Spinner animation="grow" />;
  }
  const handleBrewLengthInput = (inputValue: string) => {
    if (inputValue) {
      if (!/^\d+$/.test(inputValue)) {
        return;
      }
    }

    const inputValueAsNumber = parseInt(inputValue);

    if (inputValueAsNumber >= 0) {
      setBrewLengthInL(inputValueAsNumber);
    }
    if (isNaN(inputValueAsNumber)) {
      setBrewLengthInL(0);
    }
  };
  const calculateWortDensityInGramsperMl = (DensityInPlato: number): number => {
    return (1000 + DensityInPlato / 4) / 1000;
  };
  const calculateMaltQuantity = (maltAddition: MaltAddition): number => {
    const quantityInGrams =
      (((recipe.OGinPlato *
        calculateWortDensityInGramsperMl(recipe.OGinPlato) *
        10 *
        maltAddition.percentageOfExtract) /
        100 /
        (1 - maltAddition.defaultMoistureInPercentage / 100)) *
        brewLengthInL) /
      DEFAULT_BREWING_EFFICIENCY;

    return Math.ceil(quantityInGrams);
  };
  const {
    ABV,
    IBU,
    OGinPlato,
    FGinPlato,
    colorInEBC,
    DesiredCarbonationInGramsPerLiter,
  } = recipe;
  return (
    <div>
      <Jumbotron>
        <h1>{recipe.name}</h1>
      </Jumbotron>
      <Form>
        <Form.File.Input isValid />
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            {t_enter_your_brewlength}
          </Form.Label>
          <Col sm="2">
            <Form.Control
              value={brewLengthInL}
              onChange={(e) => handleBrewLengthInput(e.target.value)}
            />
          </Col>
          <Form.Label column sm="1" style={{ textAlign: "left" }}>
            {"L"}
          </Form.Label>
        </Form.Group>
      </Form>
      <div>
        <h2> {t_specifications}</h2>
      </div>
      <SpecificationTable
        ABV={ABV}
        IBU={IBU}
        OGinPlato={OGinPlato}
        FGinPlato={FGinPlato}
        colorInEBC={colorInEBC}
        DesiredCarbonationInGramsPerLiter={DesiredCarbonationInGramsPerLiter}
      />
      <div>
        <h2> {t_fermentables}</h2>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t_type}</th>
            <th>{t_percentageOfExtract}</th>
            <th>{`${t_quantity} (g)`}</th>
          </tr>
        </thead>
        <tbody>
          {recipe.maltAdditions.map((maltAddition: MaltAddition) => {
            return (
              <tr key={maltAddition.id}>
                <td>{maltAddition.name}</td>
                <td>{maltAddition.percentageOfExtract}</td>
                <td>{calculateMaltQuantity(maltAddition)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
