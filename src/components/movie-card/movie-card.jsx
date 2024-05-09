// Here you import the PropTypes library
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}{movie._id}
        </div>
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