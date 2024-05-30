import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, ListGroup, Form } from 'react-bootstrap';

export const ProfileView = ({ user, onLoggedOut }) => {
    const [userData, setUserData] = useState(null);
    const [newFavoriteMovie, setNewFavoriteMovie] = useState('');
    const [updatedUser, setUpdatedUser] = useState({
        Username: '',
        Email: '',
        Birthday: ''
    });
    console.log(user)

    useEffect(() => {
        // Fetch user data when the component mounts
        axios.get(`/users/${user}`)
            .then(response => {
                setUserData(response.data);
                setUpdatedUser({
                    Username: response.data.Username,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, [user]);

    const addFavoriteMovie = () => {
        axios.post(`/users/${user}/movies/${newFavoriteMovie}`)
            .then(response => {
                setUserData(response.data);
                setNewFavoriteMovie(''); // Clear input field
            })
            .catch(error => {
                console.error('There was an error adding the movie to favorites!', error);
            });
    };

    const removeFavoriteMovie = (movieId) => {
        axios.delete(`/users/${user}/movies/${movieId}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error removing the movie from favorites!', error);
            });
    };

    const handleUpdate = () => {
        axios.put(`/users/${user}`, updatedUser)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('There was an error updating the user data!', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`/users/${user}`)
            .then(() => {
                onLoggedOut();
            })
            .catch(error => {
                console.error('There was an error deleting the user account!', error);
            });
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <h1>{userData.Username}'s Profile</h1>
            <Card>
                <Card.Body>
                    <Card.Title>User Information</Card.Title>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedUser.Username}
                                onChange={e => setUpdatedUser({ ...updatedUser, Username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={updatedUser.Email}
                                onChange={e => setUpdatedUser({ ...updatedUser, Email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={updatedUser.Birthday}
                                onChange={e => setUpdatedUser({ ...updatedUser, Birthday: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdate}>Update Profile</Button>
                        <Button variant="danger" onClick={handleDelete} className="ml-2">Delete Account</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>Favorites</Card.Title>
                    <ListGroup>
                        {userData.FavoriteMovies.map(movie => (
                            <ListGroup.Item key={movie._id}>
                                {movie.title}
                                <Button
                                    variant="danger"
                                    className="ml-2"
                                    onClick={() => removeFavoriteMovie(movie._id)}
                                >
                                    Remove
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form inline className="mt-3">
                        <Form.Control
                            type="text"
                            value={newFavoriteMovie}
                            onChange={e => setNewFavoriteMovie(e.target.value)}
                            placeholder="Add a new favorite movie"
                            className="mr-2"
                        />
                        <Button onClick={addFavoriteMovie}>Add Movie</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Button
                variant="primary"
                className="mt-3"
                onClick={() => {
                    onLoggedOut();
                    localStorage.clear();
                }}
            >
                Logout
            </Button>
        </div>
    );
};

export default ProfileView;