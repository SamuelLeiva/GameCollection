import React, { useContext, useEffect } from 'react'
import GameForm from '../games/GameForm'
import FilterGame from '../games/FilterGame'
import SearchGame from '../games/SearchGame'
import CountGame from '../games/CountGame'
import GamesList from '../games/GamesList'
import AuthContext from '../../comtext/authContext/authContext'


const Home = () => {
  const { loadUser } = useContext(AuthContext)

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <div className="app-container">
      <div className="main">

        <div className="filter">
          <FilterGame />
          <SearchGame />
        </div>

        <GameForm />
        <CountGame />

      </div>
      <GamesList />

    </div>
  )
}
export default Home
