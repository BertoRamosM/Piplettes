import React from 'react'
import Movies from "../../../utils/mockMovies.json";


const EventPage = ({params}) => {
  console.log(params)

  const movie = Movies.find((movie) => movie.id === params.id);
console.log(movie)
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  )
}

export default EventPage