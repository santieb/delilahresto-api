import React from 'react'
import { Navigate } from 'react-router-dom'
import History from '../../components/History'
import Profile from '../../components/Profile'

const MyAccount = (user) => {
  return (
    <>
    {!user.user ? <Navigate to="/"></Navigate> : (
      <div class="flex flex-col w-100 sm:ml-20 m-auto sm:my-8 sm:flex-row">
        <Profile></Profile>
        <History></History>
      </div>
    )}
    </>
  )
}

export default MyAccount