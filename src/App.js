import './App.css'
import AnimatedCursor from 'react-animated-cursor'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { MovieProvider } from './context/MovieContext'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color='167,65,235'
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
        />
        <MovieProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:id' element={<MovieDetail />} />
              <Route path='/error' element={<ErrorPage />} />
            </Routes>
          </Router>
        </MovieProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
