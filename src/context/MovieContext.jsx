import { createContext, useReducer } from 'react'
import MovieReducer from './MovieReducer'

const MovieContext = createContext()

function MovieProvider({ children }) {
  const initialState = {
    autoSuggestions: [],
    searchTerm: '',
    trending: [],
    loading: false,
    movieDetails: {},
    page: 1
  }
  const [state, dispatch] = useReducer(MovieReducer, initialState)

  return (
    <MovieContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MovieContext.Provider>
  )
}
export { MovieProvider }
export default MovieContext
