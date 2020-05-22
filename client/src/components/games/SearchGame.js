import React, { useRef, useContext } from 'react'
import GameContext from '../../comtext/gameContext/GameContext'

//barra de busqueda de juegos
const SearchGame = () => {
  const { search_Game, clearSearchGame } = useContext(GameContext)
  const game = useRef('')
  const onchange = e => {
    if (game.current.value !== '') {
      search_Game(e.target.value)
    } else {
      clearSearchGame()
    }
  }
  return (
    <div>
      <input ref={game} onChange={onchange} type="text" placeholder="Search Game by name..." className="search" />
      <i className="fas fa-search search-icon" />
    </div>
  )
}
export default SearchGame
