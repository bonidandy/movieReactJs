import React from 'react'
import Search from './components/Search'
import { useState, useEffect } from 'react'



function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const API_BASE_URL ='https://api.themoviedb.org/3/discover'
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const API_OPTIONS ={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async () => {
    try{
      const endpoint = `${API_BASE_URL}/movie?sort_by=popularity.desc`

      const response = await fetch (endpoint, API_OPTIONS)
      
      if(!response.ok){
        throw new Error ('failed to fetch moviess')
      }

      const data = await response.json()

      if(data.response === 'false'){
        setErrorMessage(data.Error || 'Failed to fetch movie')
      }
      console.log(data)
    }catch (error){
      console.error(`error fetching movies : ${error}`)
      setErrorMessage(`lagi gabisa fetching cenah`)
    }
  }

  useEffect( () => {
    fetchMovies()
  }, [])
  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="herro-banner" />
            <h1> <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          </header>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
          <div className='text-white'>
            {searchTerm}
          </div>

          <section className='all-movies'>
            <h2>All Movies</h2>
            {errorMessage && <p className='text-red-500'>ini lagi error{errorMessage}</p>}
          </section>
        </div>


      </main>
    </>
  )
}

export default App