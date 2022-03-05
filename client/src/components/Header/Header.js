import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login'
import images from '../../assets/images/index'

const Header = () => {
  const [user, setUser] = useState(false)
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.href = "/"
  }

  useEffect(() => {
    const getUserData = async () => {
      const loggedUser = window.localStorage.getItem('loggedUser')
      const userData = JSON.parse(loggedUser).user
      setUser(userData)
    } 
    getUserData()
  }, [])

  return (
    <>
    {!user ? <Login></Login> : <></>}
    <nav class=" drop-shadow-lg bg-white border-gray-200 px-2 sm:px-4 py-6 rounded dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <div class="flex items-center">
          <img src={images.resto} class="mr-3 h-6 sm:h-10" alt="" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"><Link to='/'>Delilah Resto</Link></span>
        </div>
        {user.name}
        <div class="flex items-center md:order-2">
          <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" type="button" data-dropdown-toggle="dropdown">
            <img class="w-8 h-8 rounded-full" src="" alt="user"></img>
          </button>
          <div class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
            <ul class="py-1" aria-labelledby="dropdown">
              <li class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                <Link to='/my-account'>My account</Link>
              </li>
              <li onClick={handleLogout} class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </>
  )
}

export default Header