import { ChevronDoubleUpIcon } from '@heroicons/react/solid'
import { Line } from 'rc-progress'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getTrendingMovies } from '../context/MovieActions'
import MovieContext from '../context/MovieContext'
function Home() {
  const { dispatch, trending, page } = useContext(MovieContext)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState()
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const lastMovie = useCallback(
    (node) => {
      if (loading) {
        return
      }
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: 'INC_PAGE' })
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore]
  )
  useEffect(() => {
    dispatch({
      type: 'SET_LOADING'
    })
    const getData = async () => {
      const data = await getTrendingMovies(page)
      page === data.total_pages && setHasMore(false)
      console.log('page', page)
      console.log('trending', trending)
      dispatch({ type: 'SET_TRENDING', payload: data.results })
    }
    getData()
  }, [dispatch, page, hasMore])

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  if (loading) {
    return <div className='h12'>Loading</div>
  }
  return (
    <div className='pt-28'>
      <div className='hidden md:flex text-6xl p-10 font-semibold tracking-wider	'>
        Trending
      </div>
      <button
        style={{ display: visible ? 'block' : 'none' }}
        className='fixed bottom-10 right-10 z-10'
        onClick={scrollToTop}
      >
        <ChevronDoubleUpIcon className='bg-[#A741EB] h-6 md:h-10 xl:h-14 rounded-full p-2'></ChevronDoubleUpIcon>
      </button>
      <div
        className='px-8 mt-28 md:mt-0 sm: grid
      sm:grid
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      2xl:flex flex-wrap 2xl:justify-between'
      >
        {trending?.map((movie, index) => {
          return index === trending.length - 4 ? (
            <div key={movie.title} ref={lastMovie}>
              <MovieCard movie={movie}></MovieCard>
            </div>
          ) : (
            <MovieCard key={movie.title} movie={movie}></MovieCard>
          )
        })}
      </div>
      <div className=''>
        {true && (
          <div className='w-40 md:w-96 mt-4 absolute right-0 m-auto left-0'>
            <div className='mb-2'>Loading...</div>
            <Line
              percent='70'
              strokeWidth='1'
              strokeColor='#A741EB'
              trailWidth='1'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
