import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getMovies = async () => {
    try {
      setisLoading(true);
      const response = await fetch("https://swapi.dev/api/films");
      const data = await response.json();
      const newmovies = data.results.map((movie) => {
        return {
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(newmovies);
      setisLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
