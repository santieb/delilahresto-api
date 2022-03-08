import React, { useState } from 'react'
import Product from '../Product/Product-order'
import { createOrder } from '../../services/order'
import Paypal from '../Paypal'

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
            <div class="relative z-0 mb-6 w-full group">
                <input type='text'
                  value={address}
                  name='Address'
                  onChange={({target}) => setAddress(target.value)}
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder required />
                <label for="address" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">address</label>
            </div>
            <button>
              <Paypal cart={cart} totalPrice={calculatePriceTotal()}/>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
export default Cart
