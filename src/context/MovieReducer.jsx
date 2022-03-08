const MovieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTOCOMPLETE_DATA': {
      return {
        ...state,
        autoSuggestions: action.payload,
        loading: false
      }
    }
    case 'SET_SEARCHTERM': {
      return {
        ...state,
        searchTerm: action.payload
      }
    }
    case 'SET_TRENDING': {
      return {
        ...state,
        trending: [...state.trending, ...action.payload],
        loading: false
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: true
      }
    }
    case 'SET_MOVIE_DETAILS': {
      return {
        ...state,
        movieDetails: action.payload,
        loading: false
      }
    }
    case 'INC_PAGE': {
      return {
        ...state,
        page: state.page + 1,
      }
    }
    default:
      return state
  }
}

export default MovieReducer
