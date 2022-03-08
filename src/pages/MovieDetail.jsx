import { StarIcon } from '@heroicons/react/solid'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../context/MovieActions'
import MovieContext from '../context/MovieContext'
import { Line } from 'rc-progress'

function MovieDetail() {
  const params = useParams()
  const { dispatch, loading, movieDetails } = useContext(MovieContext)
  useEffect(() => {
    dispatch({
      type: 'SET_LOADING'
    })
    const getMovieDetails = async () => {
      const data = await getMovie(params.id)
      dispatch({ type: 'SET_MOVIE_DETAILS', payload: data })
    }
    getMovieDetails()
  }, [params, dispatch])

  if (loading) {
    return (
      <div className='w-40 md:w-96 mt-[450px] absolute right-0 m-auto left-0'>
        <div className='mb-2'>Loading...</div>
        <Line
          percent='70'
          strokeWidth='1'
          strokeColor='#A741EB'
          trailWidth='1'
        />
      </div>
    )
  }

  const genres = movieDetails?.genres?.map((genre) => genre.name)
  const backdrop_size = window.innerWidth < 1280 ? 'w1280' : 'original'
  const backgound = {
    backgroundImage:
      'url(https://image.tmdb.org/t/p/' +
      backdrop_size +
      '/' +
      movieDetails?.backdrop_path +
      ')',
    boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  return (
    <>
      <div className='md:hidden h-full w-full pt-56 flex items-center flex-col gap-2'>
        <div className='relative'>
          <img
            loading='lazy'
            className='rounded-3xl max-h-80 shadow-xl'
            src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
          <div
            className='bg-black/40 p-1 rounded-3xl flex justify-around items-center text-yellow-400 absolute
        top-2 right-2
        '
          >
            <StarIcon className='h-4' />
            <div className='px-1'>{movieDetails.vote_average}</div>
          </div>
        </div>

        <div className='flex overflow-scroll'>
          {genres?.map((genre) => {
            return (
              <div
                key={genre}
                className='rounded-3xl bg-[#A741EB]/60 m-2 p-2 text-xs'
              >
                {genre}
              </div>
            )
          })}
        </div>
        <div className='text-2xl'>{movieDetails.title}</div>
        <div className='text-lg font-extralight'>{movieDetails.tagline}</div>
        <div className='text-xl mt-6 text-[#A741EB]'>Plot Overview</div>
        <div className='p-4 font-light text-justify'>
          {movieDetails.overview}
        </div>
      </div>
      <div
        className='hidden sm:block min-h-screen w-full overflow-scroll absolute'
        style={backgound}
      >
        <div className='mt-20 xl:mt-24 p-28'>
          <div className='flex items-center justify-start'>
            <img
              loading='lazy'
              className='rounded-3xl h-60 xl:h-96'
              src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div className='ml-10'>
              <div className='md:text-3xl xl:text-7xl'>
                {movieDetails.title}
              </div>
              <div className='md:text-3xl xl:text-5xl font-extralight'>
                {movieDetails.tagline}
              </div>

              <div className='flex'>
                {genres?.map((genre) => {
                  return (
                    <div
                      key={genre}
                      className='rounded-3xl bg-black/60 m-2 p-3 md:text-xs xl:text-base'
                    >
                      {genre}
                    </div>
                  )
                })}
              </div>

              <div className='bg-black/60 md:w-12 xl:w-16  md:m-1 md:p-1 xl:m-2 xl:p-2 rounded-3xl flex justify-around items-center text-yellow-400'>
                <StarIcon className='md:h-4 xl:h-6 ' />
                <div className='px-1 md:text-sm xl:text-base '>
                  {movieDetails.vote_average}
                </div>
              </div>
            </div>
          </div>
          <div className='md:text-xl xl:text-4xl p-18 mt-10 font-light text-justify'>
            {movieDetails.overview}
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieDetail
