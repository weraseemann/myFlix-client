import React from 'react';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ProfileView from "../profile-view/profile-view";

export const MainView = () => {
    // retrieve user and token from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // set initial state of user and token on retrieved values
    const [movies, setMovies] = useState([]);
    const [moviesSearch, setMoviesSearch] = useState('');
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    console.log(storedUser, "storedUser");

    useEffect(() => {
        if (!token) return;
        // fetch movies list
        fetch("https://mymovie-ff36c9df3695.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        image: movie.imageURL,
                        description: movie.description,
                        director: movie.director,
                        genre: movie.genre,
                        featured: movie.featured,
                    };
                });
                localStorage.setItem('movies', JSON.stringify(moviesFromApi));
                setMovies(moviesFromApi);
            });
    }, [token]);

    // movies search box
    const onMoviesSearch = movies.filter((movie) =>
        movie.title.toLowerCase().includes(moviesSearch.toLowerCase())
    );

    // displays and sets routes for app's different views
    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                moviesSearch={moviesSearch}
                setMoviesSearch={setMoviesSearch}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="text-light justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            user={storedUser}
                                            token={storedToken}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : onMoviesSearch.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {onMoviesSearch.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    ></Route>
                    <Route
                        path="/profile"
                        element={
                            <>
                                {storedUser ? (
                                    <ProfileView
                                        user={storedUser}
                                        onUserChange={setUser}
                                        movies={movies}
                                        token={storedToken}
                                        onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }} />
                                ) : (
                                    <Navigate to="/login" />
                                )}
                            </>
                        }
                    ></Route>
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
export default MainView;
