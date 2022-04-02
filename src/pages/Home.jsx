import { ChevronDoubleUpIcon } from '@heroicons/react/solid'
import { Line } from 'rc-progress'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick/lib/slider'
import MovieCard from '../components/MovieCard'
import { getTrendingMovies } from '../context/MovieActions'
import MovieContext from '../context/MovieContext'
function Home() {
  const navigate = useNavigate()
  const { dispatch, trending, page } = useContext(MovieContext)
  const [visible, setVisible] = useState(false)
  const [loading] = useState()
  const [imageSlider, setImageSlider] = useState([])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  )
  useEffect(() => {
    dispatch({
      type: 'SET_LOADING'
    })
    const getData = async () => {
      const data = await getTrendingMovies(page)
      page === data.total_pages && setHasMore(false)
      dispatch({ type: 'SET_TRENDING', payload: data.results })
      const result = []
        trending.slice(0, 5).forEach((i) =>
          result.push({
            title: i.title,
            backdropPath: i.backdrop_path,
            desc: i.overview,
            id: i.id
          })
        )
        setImageSlider(result)
    }
    getData()

    return function () {

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  }

  return (
    <div className='pt-28'>
      <div className='hidden md:flex text-6xl p-10 font-semibold tracking-wider	'>
        Trending
      </div>
      <Slider {...settings} className='mt-40 md:mt-0 object-fill mb-4'>
        {imageSlider?.map((i) => {
          return (
            <div
              key={i.title}
              className='relative max-h-[20%] md:h-[500px] 3xl:h-[700px]'
            >
              <img
                className='float-right'
                style={{ width: '100%', objectFit: 'contain' }}
                loading='lazy'
                src={`https://image.tmdb.org/t/p/w1280/${i.backdropPath}`}
                alt={i.title}
              />
              <div className='absolute bg-gradient-to-r from-black h-[510px] w-full top-0'></div>
              <div className='absolute m-2 z-50 bottom-4 md:bottom-8 ml-6 md:ml-12 max-w-[50%] max-h-[80%] overflow-clip'>
                <div className='text-3xl md:text-6xl overflow-hidden font-semibold'>
                  {i.title}
                </div>
                <div className='hidden md:flex text-2xl w-[60%] my-4 font-light h-[230px] overflow-hidden'>
                  {i.desc}
                </div>
                <button
                  className='h-12 bg-black/70 md:bg-[#A741EB]/70 p-1 py-2 md:p-2 font-light text-lg md:text-3xl mt-4'
                  onClick={() => navigate(`/movie/${i.id}`)}
                >
                  Info
                </button>
              </div>
            </div>
          )
        })}
      </Slider>
      <button
        style={{ display: visible ? 'block' : 'none' }}
        className='fixed bottom-10 right-10 z-10'
        onClick={scrollToTop}
      >
        <ChevronDoubleUpIcon className='bg-[#A741EB] h-6 md:h-10 xl:h-14 rounded-full p-2'></ChevronDoubleUpIcon>
      </button>
      <div
        className='px-8 md:mt-0 sm: grid
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
