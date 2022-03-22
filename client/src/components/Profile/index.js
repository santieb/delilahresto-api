import React, { useEffect, useState } from 'react'
import getUser from '../../services/user'
import updateUser from '../../services/updateUser'
import Address from '../Address'

const Profile = () => {
  const [userData, setUserData] = useState('')
  const [address, setAddress] = useState([])
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
    const newAddress = [...address, {"id": address.length, "address": "New Address" }]
    setAddress(newAddress)
  }

  
  const handleDelete = (id) => {
    const newAddress = address.filter(address => address.id !== id)
    setAddress(newAddress)
  }

  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-lg ">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">My account</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal information</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.name} type="text" name="name" class="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Username</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.username} type="text" name="username" class="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.email} type="email" name="email" class="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Phone</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <input onChange={handleChange} defaultValue={userData.phone} type="number" name="phone" class="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Address Book</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {
                address.map((address) => <Address address={address} handleDelete={handleDelete} ></Address>)
              }
            </dd>
            <button onClick={addAddress} type="button" class="w-16 p-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2">
              Add
            </button>
          </div>
          <div class="px-4 py-5 sm:px-6 ">
            <button onClick={() => handleUpdate()} type="button" class="text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update</button>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Profile