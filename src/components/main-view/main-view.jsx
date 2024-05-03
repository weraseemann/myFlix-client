import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {
            _id: "1",
            title: "Schindler's List",
            description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
            director: "Steven Spielberg",
            genre: "Drama",
            imageURL: "https://example.com/schindlers_list.jpg"
        },
        {
            _id: "2",
            title: "The Shawshank Redemption",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            director: "Frank Darabont",
            genre: "Drama",
            imageURL: "https://example.com/shawshank_redemption.jpg"
        },
        {
            _id: "3",
            title: "The Godfather",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            director: "Francis Ford Coppola",
            genre: "Crime",
            imageURL: "https://example.com/the_godfather.jpg"
        }

    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} />;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
