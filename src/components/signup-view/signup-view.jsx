import { useState } from "react";
import { Button, Form, Card, CardGroup, CardBody, Container, Col, Row } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://mymovie-ff36c9df3695.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup className="content-below-navigation">
                        <Card className="text-light bg-dark" >
                            <CardBody >
                                <Card.Title className="text-center text-light" >Please register!</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="signUpFormUsername">
                                        <Form.Label className="text-light">Username:</Form.Label>
                                        <Form.Control
                                            className="text-light bg-secondary"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            minLength="3"
                                            placeholder="Enter your username"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="signUpFormPassword">
                                        <Form.Label className="text-light">Password:</Form.Label>
                                        <Form.Control
                                            className="text-light bg-secondary"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength="8"
                                            placeholder="Your password must have 8 or more characters"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="signUpFormEmail">
                                        <Form.Label className="text-light">Email:</Form.Label>
                                <Form.Control
                                    className="text-light bg-secondary"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your Email address"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="signUpFormBirthday">
                                        <Form.Label className="text-light">Birthday:</Form.Label>
                                        <Form.Control
                                            className="text-light bg-secondary"
                                            type="date"
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="light" type="submit" className="mt-3 w-100">
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
