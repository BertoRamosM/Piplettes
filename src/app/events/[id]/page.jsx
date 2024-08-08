import React from 'react'
import Movies from "../../../utils/mockMovies.json";
import Image from 'next/image';


const EventPage = ({params}) => {

  const movie = Movies.find((movie) => movie.id === params.id);


  return (
    <div className="">
      <div className="flex gap-4 items-center justify-between pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">{movie.title}</h1>
          <h3 className="text-xl">
            {movie.director}, <span className='text-sm'>{movie.release}</span>
          </h3>

          <div className="flex gap-2">
            {movie.themes.map((theme, index) => (
              <div
                className="border-2 border-zinc-400 p-1 rounded-xl"
                key={index}
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
        <Image src={movie.image} alt={movie.title} width={300} height={200} />
      </div>
      <h4 className="text-2xl text-bold underline pb-2">Synopsis</h4>
      <p className="text-pretty">{movie.synopsis}</p>
    </div>
  );
}

export default EventPage