
import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss"

export const ProfileView = ({ user, movies, token, onLoggedOut, onUserChange }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [updatedUser, setUpdatedUser] = useState({ ...storedUser });
    const farvoriteMoviesData = movies?.filter((movie) =>
        storedUser.FavouriteMovies?.includes(movie.id)
    );
    const removeFavoriteMovie = (movieId) => {
        fetch(
            `https://mymovie-ff36c9df3695.herokuapp.com/users/${user.Username}/movies/favourites/${movieId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data, "data jhere");
                localStorage.setItem("user", JSON.stringify(data));
                setUpdatedUser(data);
            })
            .catch((error) => {
                console.error(
                    "There was an error removing the movie to favorites!",
                    error
                );
            });
    };
    const handleUpdate = () => {
        axios
            .put(
                `https://mymovie-ff36c9df3695.herokuapp.com/users/${storedUser.Username}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUpdatedUser(response.data); onUserChange(response.data);
            })
            .catch((error) => {
                console.error("There was an error updating the user data!", error);
            });
    };
    const handleDelete = () => {
        axios
            .delete(
                `https://mymovie-ff36c9df3695.herokuapp.com/users/${storedUser.Username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
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
            <h1 class="profile-header">{updatedUser.Username}'s Profile 
            <Button 
                            onClick={handleDelete} 
                            className="ml-2"
                            style={{ marginTop: 15, color: "yellow" }}
                            >
                            Delete Account
                        </Button></h1>
            <Card style={{ background: "black" }}>
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
                                style={{ background: "black" }}
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
                                style={{ background: "black" }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={updatedUser.Birthday.split("T")[0]}
                                onChange={(e) => {
                                    console.log("birthday", e.target.value);
                                    setUpdatedUser({ ...updatedUser, Birthday: e.target.value });
                                }}
                                style={{ background: "black" }}
                            />
                        </Form.Group>
                        <Button
                            className="update-profile"
                            onClick={handleUpdate}
                            style={{ marginRight: 15, marginTop: 15, color: "yellow"}}
                        >
                            Update Profile
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mt-3" style={{ background: "black" }}>
                <Card.Body>
                    <Card.Title>Favorites</Card.Title>
                    <Row>
                        {farvoriteMoviesData?.map((movie) => (
                            <>
                                <Col className="mb-4" key={movie.id} md={3}>
                                    <Card className="text-light bg-dark h-100">
                                        <Card.Img
                                            variant="top"
                                            className="h-100"
                                            src={movie.image}
                                        />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>{movie.director.name}</Card.Text>
                                            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                                                <Button variant="link">Open</Button>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                className="ml-2"
                                                onClick={() => removeFavoriteMovie(movie.id)}
                                                style={{ marginTop: 15, color: "yellow" }}
                                            >
                                                Remove
                                            </Button>
                                        </Card.Body>
                                    </Card>
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