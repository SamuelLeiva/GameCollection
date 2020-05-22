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

export default (state, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        error: null
      }
    case ADD_GAME:
      return {
        ...state,
        games: [...state.games, payload]
      }
    case REMOVE_GAME:
      return {
        ...state,
        games: state.games.filter(game => game._id !== payload)
      }
    case EDIT_GAME:
      return {
        ...state,
        editGame: payload
      }
    case CLEAR_EDIT:
      return {
        ...state,
        editGame: null
      }
    case UPDATE_GAME:
      return {
        ...state,
        games: state.games.map(game => game._id === payload._id ? payload : game)
      }
    case TOGGLE_GAMEFILTER:
      return {
        ...state,
        gameFilter: !state.gameFilter
      }
    case SEARCH_GAME:
      const regex = new RegExp(`${payload}`, 'gi')
      return {
        ...state,
        searchGame: state.games.filter(GAME => GAME.name.match(regex))
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        searchGame: null
      }
    case GAMES_ERROR:
      return {
        ...state,
        error: payload,
      }
    case CLEAR_GAMES:
      return {
        ...state,
        gameFilter: false,
        searchGame: null,
        editGame: null,
        games: [],
        error: null
      }
    default:
      return state
  }
}