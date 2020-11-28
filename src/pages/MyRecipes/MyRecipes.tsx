import React, { useEffect } from "react";
import {
  Button,
  Card,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import translation from "./translation";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import "./MyRecipes.css";
import { getUserRecipes } from "../../store/recipes/actions";
import { selectMyRecipes } from "../../store/recipes/selectors";

export default function MyRecipes() {
  const history = useHistory();
  const userLanguage: Language = useSelector(selectUserLanguage);
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

  useEffect(() => {
    dispatch(getUserRecipes());
  }, [dispatch]);
  console.log("myrecipes:", myRecipes);
  return (
    <div className="my-recipes">
      <div className="buttons-row">
        <Button className="MyRecipes-buttons"> {t_recipe_calculator}</Button>
        <Button className="MyRecipes-buttons"> {t_import_recipe}</Button>
      </div>
      <Jumbotron fluid>
        <h2>{t_my_recipes}</h2>
      </Jumbotron>
      <div style={{ display: "flex" }}>
        {myRecipes.map((recipe: any) => {
          const {
            id,
            imageURL,
            name,
            ABV,
            description,
            colorInEBC,
            author,
          } = recipe;
          return (
            <Card style={{ width: "25rem", margin: "1rem" }} key={id}>
              <Card.Img variant="top" src={imageURL} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{`${description.slice(0, 240)}${
                  description.length > 240 ? "..." : ""
                }`}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{`${t_ABV}: ${ABV}%`}</ListGroupItem>
                <ListGroupItem>{`${t_color}: ${colorInEBC} EBC`}</ListGroupItem>
                <ListGroupItem>{`${t_author}: ${author.firstName} ${author.lastName} `}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={`/recipes/${id}`}>{t_see_recipe}</Card.Link>
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
