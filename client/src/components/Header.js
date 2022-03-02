import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({token}) => {
  return (
    <header className='header'>
    <h1><Link to='/'>Delilah Resto</Link></h1>
    <ul>
      {token ?       <li>Me
        <ul>
          <li><Link to='/my-account'>My account</Link></li>
          <li>Logout</li>
        </ul>
      </li>
      : <li><Link to='/login'>Login</Link></li>}

    </ul>
    </header>
  )
}

export default Header