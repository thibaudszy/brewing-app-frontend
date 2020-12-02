import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import translation from "./translation";

import { useSelector, useDispatch } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";
import {
  addRecipeToLibrary,
  removeRecipeFromLibrary,
} from "../../store/recipes/actions";
import { useHistory } from "react-router-dom";

interface Prop {
  recipe: RecipeWithAuthorName;
  isInLibrary: boolean;
}
export default function RecipeCard(props: Prop) {
  const { recipe, isInLibrary } = props;
  const history = useHistory();

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_ABV, t_color, t_author, t_see_recipe } = translation[userLanguage];

  const { id, imageURL, name, ABV, description, colorInEBC, author } = recipe;
  const dispatch = useDispatch();
  const handleImportClick = (recipeId: number) => {
    dispatch(addRecipeToLibrary(recipeId));
  };
  return (
    <Card style={{ margin: "1rem", maxWidth: "25em" }}>
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
        <Button
          variant="outline-primary"
          onClick={() => history.push(`/recipes/${id}`)}
        >
          {t_see_recipe}
        </Button>{" "}
        {!isInLibrary ? (
          <Button
            variant="primary"
            onClick={() => {
              handleImportClick(id);
            }}
          >
            Import
          </Button>
        ) : (
          <Button
            variant="outline-danger"
            onClick={() => dispatch(removeRecipeFromLibrary(id))}
          >
            Remove
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
