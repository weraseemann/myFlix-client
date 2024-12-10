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
        <div className="movie-detail">
  <img src={movie.image} alt={movie.title} />
  <div className="movie-info">
    <p>
      <span>Title: </span>
      {movie.title} <br />
      <span>Director: </span>
      {movie.director.name} <br />
      <span>Genre: </span>
      {movie.genre.name} <br />
      <span>Description: </span>
      {movie.description}
    </p>
    <div className="actions">
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      <Button className="favorite-button" onClick={addFavoriteMovie}>
        Add Movie as your Favourite
      </Button>
    </div>
  </div>
</div>
    );
};