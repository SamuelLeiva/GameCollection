import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../comtext/authContext/authContext'
import GameContext from '../../comtext/gameContext/GameContext'

const Navbar = ({ title, icon }) => {
  const { user, logout, isAuthencated, clearErrors } = useContext(AuthContext)
  const { clearGames } = useContext(GameContext)

  const onLogout = () => {
    logout()
    clearGames()
    clearErrors()
  }
  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <span className="sm-hide">|</span>
      <li><a href='#!' onClick={onLogout}><span className="sm-hide">Logout</span> <i className="fas fa-sign-out-alt"></i></a></li>
    </Fragment>
  );

  const gameLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <span className="sm-hide">|</span>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <div className="logo">
        <h1><i className={icon} /> {title} </h1>
        <p>Made with <span>❤</span> by Mu Idrees</p>
      </div>
      <ul>
        {isAuthencated ? authLinks : gameLinks}
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Party RSVP',
  icon: 'fas fa-glass-cheers'
}

export default Navbar
