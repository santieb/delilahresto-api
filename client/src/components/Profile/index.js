import React, { useEffect, useState } from 'react'
import getUser from '../../services/user'
import updateUser from '../../services/updateUser'
import Address from '../Address'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [address, setAddress] = useState([])
  const [newAddress, setNewAddress] = useState('')
  const [data, setData] = useState([])
  const { name, username, email, phone } = data

  useEffect(() => {
    const getUserData = async () => {
      const loggedUser = window.localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUser).token
  
      const data = await getUser(token)
      setUserData(data.user)
      setAddress(data.user.addressBook)
    }
    getUserData()
  }, [])

  const handleUpdate = async () => {
    try{
      const loggedUser = window.localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUser).token

      console.log(address)
      const newUserData = {
        name: name ? name : userData.name,
        username: username ? username : userData.username,
        email: email ? email : userData.email,
        phone: phone ? phone : userData.phone,
        addressBook: address ? address : userData.addressBook
      }

      const res = await updateUser(token, newUserData)
      if (res.status) alert(res.message)

    } catch (err) {
      alert('error', err)
    }
  }

  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]:value})
  }

  const addAddress = () => {
    const data = [...address, {"id": address.length, "address": newAddress }]
    setAddress(data)
    setNewAddress('')
  }

  const handleDelete = (id) => {
    const newAddress = address.filter(address => address.id !== id)
    setAddress(newAddress)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">My account</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal information</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.name} type="text" name="name" className="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.username} type="text" name="username" className="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.email} disabled type="email" name="email" className="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.phone} type="number" name="phone" className="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address Book</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {
                address.map((address) => <Address address={address} handleDelete={handleDelete} key={address.id}></Address>)
              }
                          <div className="flex flex-row">
              <input onChange={({target}) => setNewAddress(target.value)} type="text" value={newAddress} name="phone" className="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="New Address" />
              <button onClick={addAddress} type="button" className="w-16 p-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2">
                Add
              </button>
            </div>
            </dd>

          </div>
          <div className="px-4 py-5 sm:px-6 ">
            <button onClick={() => handleUpdate()} type="button" className="text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update</button>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Profile