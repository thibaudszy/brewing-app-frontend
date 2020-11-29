import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import translation from "./translation";

import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

interface Prop {
  recipe: RecipeWithAuthorName;
  isInLibrary: boolean;
}
export default function RecipeCard(props: Prop) {
  const { recipe, isInLibrary } = props;

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_ABV, t_color, t_author, t_see_recipe } = translation[userLanguage];

  const { id, imageURL, name, ABV, description, colorInEBC, author } = recipe;
  const handleImportClick = (id: number) => {
    //TO DO
  };
  return (
    <Card style={{ width: "25rem", margin: "1rem" }}>
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
        <Card.Link href={`/recipes/${id}`}>{t_see_recipe}</Card.Link>{" "}
        {!isInLibrary ? (
          <Button
            variant="primary"
            // disabled={isLoading}
            // onClick={handleImportClick(id)}
          >
            Import{/* {isLoading ? 'Loading…' : 'Click to load'} */}
          </Button>
        ) : (
          <Button
            variant="outline-danger"
            // disabled={isLoading}
            // onClick={handleImportClick(id)}
          >
            Remove{/* {isLoading ? 'Loading…' : 'Click to load'} */}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
