import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if(cancel){
      clearInterval(intervalId);
    }
  }, [cancel, intervalId]);
  

  const getMovies = () => {
    setisLoading(true);
    setError(null);
    if (intervalId === null) {
      setIntervalId(setInterval(async () => {
        try{
          const response = await fetch("https://swapi.dev/api/film");
        if (!response.ok) {
          throw new Error("Something went Wrong...Retrying");
        }
        setError(null);
        const data = await response.json();
        clearInterval(intervalId);
        const newmovies = data.results.map((movie) => {
          return {
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        clearInterval(intervalId);
        setMovies(newmovies);
        }catch (err) {
          setError(err.message);
        }
        setisLoading(false);
      }, 5000));
    }
  };

  let content = <p>No Movies to Show.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }
  if(isLoading){
    content = <p>Loading...</p>
  }
  if(error){
    content = <p>{error}</p>
  }

  if(cancel){
    content = <p>Retrying Cancelled!</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
        <button onClick={() => {setCancel(true)}}>Cancel Retry</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
