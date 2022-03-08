import { StarIcon } from '@heroicons/react/solid'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MovieContext from '../context/MovieContext'

function MovieCard({ movie }) {
  const { dispatch } = useContext(MovieContext)

  const year = (movie?.release_date || movie?.first_air_date)?.split('-')[0]
  return (
    <div className='relative z-0'>
      <div
        className='z-10 rounded-3xl sm:m-6 my-8 sm:w-60 md:w-72
        md:hover:scale-105 md:transform transition duration-100
        md:hover:border-2 border-[#A741EB] shadow-lg
      '
        onClick={() => dispatch({ type: 'INC_PAGE' })}
      >
        <Link to={`/movie/${movie.id}`}>
          <div className=''>
            <img
              loading='lazy'
              className='rounded-3xl'
              src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
              alt={movie.title}
            />
            <div
              className='flex px-6 absolute sm:bottom-0 bottom-8 pb-8
              w-full rounded-b-3xl pt-28 justify-between
              bg-gradient-to-t from-black'
            >
              <div>
                <div className='md:text-3xl text-2xl'>
                  {movie.title || movie.name}
                </div>
                <div className='md:text-xl text-lg'>{year}</div>
              </div>
              <div className='flex h-8 items-center w-16 px-1 bg-gray-900/90 justify-around rounded-3xl text-yellow-400'>
                <StarIcon className='h-4' />
                {movie.vote_average}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
