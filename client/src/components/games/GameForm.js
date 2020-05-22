//modificar las propiedades
import React, { useContext, useState, useEffect } from 'react'
import GameContext from '../../comtext/gameContext/GameContext'

const GameForm = () => {
  const context = useContext(GameContext)
  const { addGame, editGame, clearEdit, update_Game } = context

  useEffect(() => {
    if (editGame !== null) {
      setGame(editGame)
    } else {
      setGame({
        name: '',
        note: '',
        console: 'PC'
      })
    }
  }, [editGame, context])

  const [game, setGame] = useState({
    name: '',
    note: '',
    console: 'PC'
  })
  const { name, note, console } = game
  const onchange = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value
    })
  }
  const onsubmit = (e) => {
    e.preventDefault();
    if (editGame === null) {
      addGame(game);

    } else {
      update_Game(game)
      clearEdit()
    }
    setGame({
      name: '',
      note: '',
      console: 'PC',
    })
  }
  return (

    <div className="invite-section">
      <h1>{editGame !== null ? 'Edit Game' : 'Invite Someone'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Name" name="name" value={name} onChange={onchange} required />
        <input type="text" placeholder="Note" name="note" value={note} onChange={onchange} required />
        <p className="options-label">
          Console</p>
        <div className="options">
          <label className="container">PC
          <input type="radio" name="console" value="PC" onChange={onchange} checked={console === "PC"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">PSX
          <input type="radio" name="console" value="PSX" onChange={onchange} checked={console === "PSX"} />
            <span className="checkmark"></span>
          </label>
          <label className="container">N64
          <input type="radio" name="console" value="N64" onChange={onchange} checked={console === "N64"} />
            <span className="checkmark"></span>
          </label>
        </div>
        <input type="submit" value={editGame !== null ? 'Update Game' : 'Add Game'} className="btn" />
        {editGame !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </div>
  )
}

export default GameForm



