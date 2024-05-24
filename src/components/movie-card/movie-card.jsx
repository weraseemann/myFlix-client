// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="text-light bg-dark h-100">
            <Card.Img variant="top" className="h-100" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
// Here is where we define all the props constraints for the BookCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        director: PropTypes.shape({
            name: PropTypes.string,
            directorID: PropTypes.string,
        }),
        description: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string,
            genreID: PropTypes.string,
        }),
        id: PropTypes.string.isRequired,
        featured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};