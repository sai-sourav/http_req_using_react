import React from 'react';
import { Button } from 'react-bootstrap';

import classes from './Movie.module.css';

const Movie = (props) => {
  const deleteMovie = async () => {
      try{
        await fetch(`https://react-http-2467f-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${props.id}.json`,{
          method : "DELETE",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        props.isdeleted();

      }catch(err){
        console.log(err)
      }
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Button variant='danger' onClick={deleteMovie}>Delete Movie</Button>
    </li>
  );
};

export default Movie;
