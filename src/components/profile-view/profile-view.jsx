import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, ListGroup, Form, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [updatedUser, setUpdatedUser] = useState({ ...storedUser });
    const farvoriteMoviesData = movies?.filter((movie) =>
        storedUser.FavouriteMovies?.includes(movie.id)
    );
    // const [updatedUser, setUpdatedUser] = useState({
    //   Username: user.Username,
    //   Email: user.Email,
    //   Birthday: user.Birthday,
    // });
    // console.log(user);
    // console.log(movies, "movies");

    // const [farvoriteTest, setFarvoriteTest] = useState([]);

    // useEffect(() => {
    //   const storedUser = JSON.parse(localStorage.getItem("user"));
    //   const farvoriteMoviesData = movies?.filter((movie) =>
    //     storedUser.FavouriteMovies?.includes(movie.id)
    //   );
    //   setFarvoriteTest(farvoriteMoviesData);
    // }, [user]);
    // console.log(farvoriteTest, "farvoriteTest");

    const removeFavoriteMovie = (movieId) => {
        axios
            .delete(`https://mymovie-ff36c9df3695.herokuapp.com/users/${user}/movies/${movieId}`)
            .then((response) => {
                setUpdatedUser(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error removing the movie from favorites!",
                    error
                );
            });
    };

    const handleUpdate = () => {
        axios
            .put(`/users/${user}`, updatedUser)
            .then((response) => {
                setUpdatedUser(response.data);
            })
            .catch((error) => {
                console.error("There was an error updating the user data!", error);
            });
    };

    const handleDelete = () => {
        axios
            .delete(`/users/${user}`)
            .then(() => {
                onLoggedOut();
            })
            .catch((error) => {
                console.error("There was an error deleting the user account!", error);
            });
    };

    if (!updatedUser) return <div>Loading...</div>;

    return (
        <div>
            <h1>{updatedUser.Username}'s Profile</h1>
            <Card style={{ background: "white" }}>
                <Card.Body>
                    <Card.Title>User Information</Card.Title>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedUser.Username}
                                onChange={(e) =>
                                    setUpdatedUser({ ...updatedUser, Username: e.target.value })
                                }
                                style={{ background: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={updatedUser.Email}
                                onChange={(e) =>
                                    setUpdatedUser({ ...updatedUser, Email: e.target.value })
                                }
                                style={{ background: "white" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={updatedUser.Birthday}
                                onChange={(e) =>
                                    setUpdatedUser({ ...updatedUser, Birthday: e.target.value })
                                }
                                style={{ background: "white" }}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdate} style={{ marginRight: 3 }}>
                            Update Profile
                        </Button>
                        <Button variant="danger" onClick={handleDelete} className="ml-2">
                            Delete Account
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mt-3" style={{ background: "white" }}>
                <Card.Body>
                    <Card.Title>Favorites</Card.Title>
                    <Row>
                        {farvoriteMoviesData?.map((movie) => (
                            <>
                                <Col className="mb-4" key={movie.id} md={3}>
                                    <MovieCard movie={movie} />

                                    <Button
                                        variant="danger"
                                        className="ml-2"
                                        onClick={() => removeFavoriteMovie(movie.id)}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            </>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileView;