import { useCallback, useContext, useRef, useState } from 'react'
import { getAutocompmleteData } from '../context/MovieActions'
import { debounce } from 'lodash'
import MovieContext from '../context/MovieContext'
import { Link, useNavigate} from 'react-router-dom'
import { SearchIcon, PlayIcon, XIcon } from '@heroicons/react/outline'

function Navbar() {
  const searchInput = useRef(null)
  let navigate = useNavigate();
  const { autoSuggestions, dispatch } = useContext(MovieContext)
  const [showAutocomplete, setShowAutoComplete] = useState(false)
  const autosuggest = async () => {
    const searchTerm = searchInput.current.value
    const data = await getAutocompmleteData(searchTerm)
    dispatch({ type: 'SET_AUTOCOMPLETE_DATA', payload: data })
  }

  const debouncedAutoComplete = useCallback(debounce(autosuggest, 500), [])

  const handleOnChange = (e) => {
    debouncedAutoComplete()
  }

  const clearInput = () => {
    searchInput.current.value = null
    dispatch({ type: 'SET_AUTOCOMPLETE_DATA', payload: [] })
  }

  const hideAutocomplete = (e) => {
    if (e?.relatedTarget?.className === 'autosuggestion') {
      return
    }
    setShowAutoComplete(false)
    return
  }
  const submitMovie = (e) => {
    if(e.key === 'Enter'){
      navigate(`../movie/${autoSuggestions?.results[0]?.id}`);
    }
  }
  return (
    <div className='absolute z-50'>
      <div className='p-6 fixed text-xl md:flex md:justify-between items-center md:h-20 w-full grid justify-items-center bg-[#1A212A] drop-shadow-xl'>
        <div className='cursor-pointer flex items-center md:ml-4'>
          <PlayIcon className='h-12 text-[#A741EB] mr-2' />
          <div className='font-bold text-3xl hover:text-[#A741EB] w-full'>
            <Link to='/'>MOVIA</Link>
          </div>
        </div>

        <div className='flex flex-grow md:justify-start gap-8 md:ml-4 mt-2 md:mt-0'>
          <div className='nav-item'>
            <Link to='/'>Trending</Link>
          </div>
          <div className='nav-item'>
            <Link to='/'>Movies</Link>
          </div>
          <div className='nav-item'>
            <Link to='/'>TV</Link>
          </div>
        </div>

        <div className='relative'>
          <div
            className='flex rounded-full border-[0.5px] border-gray-200
             px-3 py-3 items-center
             h-10 bg-black opacity-25 mt-6 md:mt-0 mx-8'
          >
            <SearchIcon className='h-6' />
            <input
              className='h-6 focus:outline-none bg-transparent mx-2 text-white w-full'
              type='text'
              onChange={handleOnChange}
              ref={searchInput}
              onFocus={() => setShowAutoComplete(true)}
              onBlur={hideAutocomplete}
              onKeyPress={submitMovie}
            />
            <XIcon className='h-6' onClick={clearInput} />
          </div>
          <button className='hidden' onSubmit={submitMovie}></button>
          <div>
            {showAutocomplete &&
              searchInput.current.value.length > 0 &&
              autoSuggestions?.results?.length > 0 && (
                <div
                  className='text-base bg-black/90 h-[400px] overflow-scroll mx-8
             rounded-3xl mt-2 absolute'
                >
                  {autoSuggestions?.results?.map((suggestion) => (
                    <div key={suggestion.id}>
                      <Link
                        className='autosuggestion'
                        to={`/movie/${suggestion.id}`}
                      >
                        <div
                          className='flex px-4 my-3 cursor-pointer hover:bg-[#A741EB]/50'
                          onClick={() =>
                            dispatch({
                              type: 'SET_AUTOCOMPLETE_DATA',
                              payload: []
                            })
                          }
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${suggestion.poster_path}`}
                            alt={suggestion.title}
                            className='h-14 pr-4'
                            loading='lazy'
                          />
                          <div>{suggestion.title}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
