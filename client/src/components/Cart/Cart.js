import React, { useState, useEffect } from 'react'
import Product from '../Product/Product-order'
import { createOrder } from '../../services/order'
import Paypal from '../Paypal'
import getUser from '../../services/user'
import Address from './Address'

const Cart = ({cart, setCart}) => {
  const [address, setAddress] = useState('')
  const [addressBook, setAddressBook] = useState('')

  const calculatePriceTotal = () => cart.reduce((acc, product) => acc + product.price * product.amount, 0)

  const handleBuy = async (event) => {
    event.preventDefault()
    try{
      console.log(address)
      const loggedUser = localStorage.getItem('loggedUser')
      if(!loggedUser) window.location.href = "/login";
      const token = JSON.parse(loggedUser).token

      await createOrder(token, cart, address, "bitcoin")
    } catch (err) {
      alert('log in before', err)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      const loggedUser = window.localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUser).token
      const data = await getUser(token)
      setAddressBook(data.user.addressBook)
    }
    getUserData()
  }, [setAddressBook])

  
  return (
    <>
      {cart.length === 0
      ? (
        <div class="p-4 bg-white rounded-lg border shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div class="flow-root">
            <img alt="" src="https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png" ></img>
            <p class="my-4 divide-y divide-gray-200 dark:divide-gray-700">
              The order is empty.
            </p>
          </div>
        </div>
      ) : (
        <div class="p-4 bg-white rounded-lg border shadow-md">
          <div class="flex justify-between items-center mb-2">
            <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div class="flow-root">
            <div role="list" class="divide-y divide-gray-200 dark:divide-gray-500">
              {cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> )}
            </div>
          </div>
          <div class="flex justify-between items-center pt-2 pb-6">
            <span class="text-base text-center ">
              Total Price 
            </span>
            <span class="text-base px-5 text-yellow-500 text-center ">
              ${calculatePriceTotal()}
            </span>
          </div>
          <form onSubmit={handleBuy}>
            <label for="countries" name="address2" onChange={({target}) => setAddress(target.value)} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select your address</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {addressBook.map(address => <Address address={address}/>)}
            </select>
            <button>
              Comprar
            </button>
          </form>
        </div>
      )}
    </>
  )
}
export default Cart
