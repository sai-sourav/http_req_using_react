import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/Form";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [isDeleted, setisDeleted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (cancel) {
      clearInterval(intervalId);
      console.log(`cancelled ${intervalId}`)
    }
  }, [cancel, intervalId]);

  const getMovies = useCallback(() => {
    setCancel(false);
    setisLoading(true);
    setError(null);
    clearInterval(intervalId);
    setIntervalId(
      setInterval(async () => {
        try {
          const response = await fetch("https://react-http-2467f-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");
          if (!response.ok) {
            throw new Error("Something went Wrong...Retrying");
          }
          setError(null);
          const data = await response.json();
          clearInterval(intervalId);
          const newmovies = [];
          for (const key in data){
             const obj = {
              id : key,
              title : data[key].title,
              releaseDate: data[key].releasedate,
              openingText: data[key].openingtext
             }
             newmovies.push(obj)
          }

          setMovies(newmovies);
        } catch (err) {
          setError(err.message);
        }
        setisLoading(false);
      }, 5000)
    );
  }, [intervalId]);

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line
  }, [isDeleted]);

  let content = <p>No Movies to Show.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} isdeleted={() => setisDeleted((prev) => !prev)}/>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (cancel) {
    content = <p>Retrying Cancelled!</p>;
  }

  return (
    <React.Fragment>
      <section className="section" style={{textAlign : "left"}}>
        <AddMovie />
      </section>
      <section className="section">
        <button className="button" onClick={getMovies}>Fetch Movies</button>
        <button
          onClick={() => {
            setCancel(true);
          }}
          disabled={movies.length > 0}
          className="button"
        >
          Cancel Retry
        </button>
      </section>
      <section className="section">{content}</section>
    </React.Fragment>
  );
}

export default App;
