import React, { useContext } from 'react'
import GameContext from '../../comtext/gameContext/GameContext'

const FilterGame = () => {
  const { toggleGameFilter } = useContext(GameContext)
  return (
    <div className="toggle">
      <label className="switch">
        <input type="checkbox" onChange={() => toggleGameFilter()} />
        <span className="slider round"></span>
      </label>
      <p className="lead">Show owned only!</p>
    </div>
  )
}
export default FilterGame
