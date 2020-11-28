import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import translation from "./translation";

import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../store/user/selectors";

interface Prop {
  recipe: RecipeWithAuthorName;
  isInLibrary: boolean;
}
export default function RecipeCard(props: Prop) {
  const { recipe } = props;

  const userLanguage: Language = useSelector(selectUserLanguage);
  const { t_ABV, t_color, t_author, t_see_recipe } = translation[userLanguage];

  const { id, imageURL, name, ABV, description, colorInEBC, author } = recipe;

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
}
