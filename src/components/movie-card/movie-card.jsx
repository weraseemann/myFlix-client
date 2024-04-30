
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClcik={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};
