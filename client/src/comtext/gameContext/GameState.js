import React, { useReducer } from 'react'
import axios from 'axios'
import GameContext from './GameContext';
import GameReducer from './GameReducer';
import {
  TOGGLE_GAMEFILTER,
  SEARCH_GAME,
  CLEAR_SEARCH,
  REMOVE_GAME,
  ADD_GAME,
  EDIT_GAME,
  CLEAR_EDIT,
  UPDATE_GAME,
  GET_GAMES,
  GAMES_ERROR,
  CLEAR_GAMES
} from '../types'

const GameState = (props) => {
  const intialState = {
    gameFilter: false,
    searchGame: null,
    editGame: null,
    games: [],
    error: null
  }
  const [state, dispatch] = useReducer(GameReducer, intialState)

  // get Games
  const getGames = async () => {
    try {
      const res = await axios.get('/games')
      dispatch({
        type: GET_GAMES,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GAMES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add Game 

  const addGame = async (game) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/games', game, config)
      dispatch({
        type: ADD_GAME,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GAMES_ERROR,
        payload: err.response.msg
      })
    }
  }


  // remove Game 
  const removeGame = async (id) => {
    try {
      await axios.delete(`/games/${id}`)
      dispatch({
        type: REMOVE_GAME,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: GAMES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // update Game

  const update_Game = async (game) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/games/${game._id}`, game, config)
      dispatch({
        type: UPDATE_GAME,
        payload: res.data
      })
      getGames()

    } catch (err) {
      dispatch({
        type: GAMES_ERROR,
        payload: err.response
      })
    }
  }

  //toggle isconfirmed
  const toggleGameFilter = () => {
    dispatch({
      type: TOGGLE_GAMEFILTER
    })
  }

  // Search Game
  const search_Game = (game) => {
    dispatch({
      type: SEARCH_GAME,
      payload: game
    })
  }
  const clearSearchGame = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit Game 
  const edit_Game = (game) => {
    dispatch({
      type: EDIT_GAME,
      payload: game
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearGames = () => {
    dispatch({
      type: CLEAR_GAMES
    })
  }
  return (
    <GameContext.Provider value={{
      games: state.games,
      gameFilter: state.gameFilter,
      searchGame: state.searchGame,
      editGame: state.editGame,
      error: state.error,
      loading: state.loading,
      addGame,
      removeGame,
      edit_Game,
      clearEdit,
      update_Game,
      toggleGameFilter,
      search_Game,
      clearSearchGame,
      getGames,
      clearGames
    }} >
      {props.children}
    </GameContext.Provider >
  )
}

export default GameState
