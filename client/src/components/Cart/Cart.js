import React, { useState } from 'react'
import Product from '../Product/Product-order'
import { createOrder } from '../../services/order'

const Cart = ({cart, setCart}) => {
  const [address, setAddress] = useState('')

  const calculatePriceTotal = () => cart.reduce((acc, product) => acc + product.price * product.amount, 0)

  const handleBuy = async (event) => {
    event.preventDefault()
    try{
      const loggedUser = localStorage.getItem('loggedUser')
      if(!loggedUser) window.location.href = "/login";

      const token = JSON.parse(loggedUser).token
      await createOrder(token, cart, address, "bitcoin")
    } catch (err) {
      alert('log in before', err)
    }
  }

  return (
    <>
      {cart.length === 0
      ? (
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div class="flow-root">
            <p class="divide-y divide-gray-200 dark:divide-gray-700">
              The order is empty.
            </p>
          </div>
        </div>
      ) : (
        <div class="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div class="flow-root">
            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              {cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> )}
            </ul>
          </div>
          <p>
          Total Price {calculatePriceTotal()}
          </p>
          <form>
            <div class="relative z-0 mb-6 w-full group">
                <input type="email" name="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Pay
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Cart