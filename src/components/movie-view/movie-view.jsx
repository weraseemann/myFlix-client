import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export const MovieView = ({ movies, user, token }) => {
    const { movieId } = useParams();

    const movie = movies.find((b) => b.id === movieId);

    const addFavoriteMovie = () => {
        fetch(
            `https://mymovie-ff36c9df3695.herokuapp.com/users/${user.Username}/movies/favourites/${movieId}`,
            {
                method: "POST",
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
            })
            .catch((error) => {
                console.error(
                    "There was an error adding the movie to favorites!",
                    error
                );
            });
    };

    return (
        <div className="text-light bg-dark">
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <Link to={`/`}>
                <Button className="back-button" style={{ marginRight: 3 }}>
                    Back
                </Button>
                <Button onClick={addFavoriteMovie}>Add Movie</Button>
            </Link>
        </div>
    );
};