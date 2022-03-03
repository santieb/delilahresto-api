import React, { useEffect, useState } from 'react'
import getUser from '../../services/user'

const MyAccount = () => {
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const getUserData = async () => {
      const loggedUser = window.localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUser).token
  
      const data = await getUser(token)
      console.log(data.user)
      setUserData(data.user)
    } 
    getUserData()
  }, [])

  return (
    <div>
      <h3>My Account</h3>
      <p>name  {userData.name}</p>
      <p>username {userData.username}</p>
      <p>email {userData.email}</p>
      <p>phone {userData.phone}</p>
    </div>
  )
}

export default MyAccount