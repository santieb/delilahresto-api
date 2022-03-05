import React, { useState } from 'react'
import Product from '../Product/Product-order'
import { createOrder } from '../../services/order'
import images from '../../assets/images'

const Cart = ({cart, setCart}) => {
  const [address, setAddress] = useState('')

  const calculatePriceTotal = () => cart.reduce((acc, product) => acc + product.price * product.amount, 0)

  const handleBuy = async (event) => {
    event.preventDefault()
    try{
      console.log(event)
      const loggedUser = localStorage.getItem('loggedUser')
      if(!loggedUser) window.location.href = "/login";
      const token = JSON.parse(loggedUser).token
      console.log(token, token)
      await createOrder(token, cart, address, "bitcoin")
    } catch (err) {
      alert('log in before', err)
    }
  }

  return (
    <>
      {cart.length === 0
      ? (
        <div class="p-4 bg-white rounded-lg border shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div class="flow-root">
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
            <div class="relative z-0 mb-6 w-full group">
                <input type='text'
                  value={address}
                  name='Address'
                  onChange={({target}) => setAddress(target.value)}
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder required />
                <label for="address" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">address</label>
            </div>
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Pay
              </span>
            </button>
            <button type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
            <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
              Pay with paypal
            </button>
          </form>
        </div>
      )}
    </>
  )
}
export default Cart
