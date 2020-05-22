import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GameItem from '../games/GameItem'
import GameContext from '../../comtext/gameContext/GameContext'
import AuthContext from '../../comtext/authContext/authContext'



const GamesList = () => {

  const context = useContext(GameContext)
  const { loading } = useContext(AuthContext)
  const { games, gameFilter, searchGame, getGames } = context
  useEffect(() => {
    getGames();
    // eslint-disable-next-line
  }, []);

  if (games === null || games.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading games...' : 'Please add a game'}</h3>
  }

  return (
    <div >
      <TransitionGroup className="guests">
        {searchGame !== null ? searchGame.map(game => (
          <CSSTransition key={game._id} timeout={300}
            classNames='item' >
            <GameItem game={game} />
          </CSSTransition>)) :
          games.filter(game => !gameFilter || game.isOwned).map(game => (<CSSTransition key={game._id} timeout={300}
            classNames='item'>
            <GameItem game={game} />
          </CSSTransition>)
          )}
      </TransitionGroup>
    </div>
  )
}
export default GamesList
