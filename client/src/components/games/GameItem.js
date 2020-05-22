//revisar despues
import React, { useContext } from 'react'
import GameContext from '../../comtext/gameContext/GameContext'

const GameItem = ({ game }) => {
  const { removeGame, edit_Game, clearEdit, update_Game } = useContext(GameContext)
  const { _id, name, note, console, isOwned } = game

  const handleRemove = () => {
    removeGame(_id)
    clearEdit()
  }
  const onchange = () => {
    update_Game({ ...game, isOwned: !isOwned })
  }

  return (
    <div class="guest-card">
      <div class="card-head">
        <div >
          <label className={`${isOwned && 'confirm'}`}>Confirmed
            <i className={`fas fa-check-square ${isOwned && 'confirm'}`}><input type="checkbox" onChange={onchange} /> </i>
          </label>
        </div>
        <div>
          <button title="Edit Game"><i class="fas fa-user-edit" onClick={() => edit_Game(game)} ></i></button>
          <button onClick={handleRemove} title="Remove Game"><i class="fas fa-trash-alt remove"></i></button>
        </div>
      </div>
      <div class="card-body">
        <h2>{name}</h2>
        <span class={'badge ' + (console === 'PC' ? 'green' : console === 'N64' ? 'red' : 'seaGreen')}>{console}</span>
        <div class="contact">
          <i class="fas fa-phone-alt"></i>
          <p>{note}</p>
        </div>
      </div>
    </div>
  )
}

export default GameItem
