import "./movie-view.scss";
export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="text-light bg-dark">
            <div>
                <img src={movie.image} />
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
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};