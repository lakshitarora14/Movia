const API_KEY = process.env.REACT_APP_API_KEY

export const getAutocompmleteData = async (searchTerm) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`
  )
  const data = await res.json()
  return data
}

export const getTrendingMovies = async (page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`
  )
  const data = await res.json()
  return data
}

export const getMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  )
  const data = await res.json()
  return data
}
