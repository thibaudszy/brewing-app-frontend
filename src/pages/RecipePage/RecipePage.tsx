import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Col,
  Form,
  Jumbotron,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import translation from "./translation";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";

import { apiUrl } from "../../config/constants";
import SpecificationTable from "./SpecificationTable";
import { appDoneLoading, appLoading } from "../../store/appState/actions";
import Axios, { AxiosResponse } from "axios";
import emptyRecipe from "./emptyRecipe";
import Fermentables from "./Fermentables";
import Hops from "./Hops";
import MashSchedule from "./MashSchedule";

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
    t_specifications,
    t_hop_additions,
    t_mash_schedule,
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

  const {
    ABV,
    IBU,
    OGinPlato,
    FGinPlato,
    colorInEBC,
    DesiredCarbonationInGramsPerLiter,
    mashSteps,
    BoilDurationInMin,
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
          <Form.Label column sm="2" style={{ textAlign: "left" }}>
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
        <Fermentables recipe={recipe} brewLengthInL={brewLengthInL} />
      </div>
      <div>
        <h2> {t_mash_schedule}</h2>
        <MashSchedule mashSteps={mashSteps} />
      </div>
      <div>
        <h2>
          {t_hop_additions}
          <Badge
            variant="warning"
            style={{ marginLeft: "1em" }}
          >{`Boil duration: ${BoilDurationInMin} min`}</Badge>
        </h2>
        <Hops recipe={recipe} brewLengthInL={brewLengthInL} />
      </div>
    </div>
  );
}
