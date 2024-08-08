import React from 'react'
import Movies from "../../../utils/mockMovies.json";


const EventPage = ({params}) => {
  console.log(params)

  const movie = Movies.find((movie) => movie.id === params.id);


console.log(movie)
  return (
    <div className="">
      <h1>{movie.title}</h1>
      <h3>{movie.director}</h3>
      <p>{movie.synopsis}</p>
    </div>
  );
}

export default EventPage