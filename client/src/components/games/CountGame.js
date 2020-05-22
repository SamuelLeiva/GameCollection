//
import React, { useContext } from 'react'
import GameContext from '../../comtext/gameContext/GameContext'

const Countgame = () => {
  const { games } = useContext(GameContext)
  // total confirmed
  const confirmed = games.filter(game => game.isOwned);
  // count by console
  const countByconsole = (console) => {
    return {
      total: games.filter(game => game.console === console).length,
      confirmed: confirmed.filter(game => game.console === console).length
    };
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Game</th>
            <th>En lista</th>
            <th>Adquirido</th>
          </tr>
          <tr>
            <th>PC</th>
            <td>{countByconsole('PC').total}</td>
            <td>{countByconsole('PC').confirmed}</td>
          </tr>
          <tr>
            <th>PSX</th>
            <td>{countByconsole('PSX').total}</td>
            <td>{countByconsole('PSX').confirmed}</td>
          </tr>
          <tr>
            <th>N64</th>
            <td>{countByconsole('N64').total}</td>
            <td>{countByconsole('N64').confirmed}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{games.length}</td>
            <td>{confirmed.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Countgame
