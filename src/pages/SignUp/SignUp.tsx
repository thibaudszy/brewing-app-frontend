import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { login } from "../../store/user/actions";
import { selectToken, selectUserLanguage } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import translation from "./translation";

export default function Login() {
  const userLanguage: Language = useSelector(selectUserLanguage);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    language: "",
    gender: "",
  });
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  const {
    sign_up_page_title,
    first_name,
    last_name,
    email_address,
    password_label,
    language_label,
    gender_label,
    sign_up,
    t_male,
    t_female,
    t_other,
  } = translation[userLanguage];

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event: any) {
    event.preventDefault();

    //dispatch(signUp(newUser));
  }

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">{sign_up_page_title}</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>{first_name}</Form.Label>
          <Form.Control
            value={newUser.firstName}
            onChange={(event) =>
              setNewUser({ ...newUser, firstName: event.target.value })
            }
            placeholder={first_name}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>{last_name}</Form.Label>
          <Form.Control
            value={newUser.lastName}
            onChange={(event) =>
              setNewUser({ ...newUser, lastName: event.target.value })
            }
            placeholder={last_name}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{email_address}</Form.Label>
          <Form.Control
            value={newUser.email}
            onChange={(event) =>
              setNewUser({ ...newUser, lastName: event.target.value })
            }
            type="email"
            placeholder={email_address}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLanguage">
          <Form.Label>{language_label}</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) =>
              setNewUser({ ...newUser, language: event.target.value })
            }
            placeholder={language_label}
            required
          >
            <option value="En-GB">English</option>
            <option value="Fr-FR">Français</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicGender">
          <Form.Label>{gender_label}</Form.Label>
          <Form.Control
            as="select"
            onChange={(event) =>
              setNewUser({ ...newUser, gender: event.target.value })
            }
            required
          >
            <option value="male">{t_male}</option>
            <option value="female">{t_female}</option>
            <option value="other"> {t_other} </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>{password_label}</Form.Label>
          <Form.Control
            value={newUser.password}
            onChange={(event) =>
              setNewUser({ ...newUser, password: event.target.value })
            }
            type="password"
            placeholder={password_label}
            required
          />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            {sign_up}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
