import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import images from '../../assets/images'

const Header = ({user}) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.href = "/"
  }

  return (
    <header className='header'>
    <h1><Link to='/'>Delilah Resto</Link></h1>
    <ul>
      {user ? <li>{user.user.name}<img alt='' src={images.flecha}></img>
        <ul>
          <li className='header-user'><Link to='/my-account'>My account</Link></li>
          <li className='header-user'onClick={handleLogout}>Logout</li>
        </ul>
      </li>
      : <li><Link to='/login'>Login</Link></li>}
    </ul>
    </header>
  )
}

export default Header