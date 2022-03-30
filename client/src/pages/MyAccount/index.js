import React from 'react'
import History from '../../components/History'
import Profile from '../../components/Profile'

const MyAccount = () => {
  return (
    <>
      <div className="flex flex-col w-100 sm:ml-20 m-auto sm:my-8 sm:flex-row">
        <Profile></Profile>
        <History></History>
      </div>
    </>
  )
}

export default MyAccount