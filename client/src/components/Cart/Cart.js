import React, { useState, useEffect } from 'react'
import Product from '../Product/Product-order'
import { createOrder, confirmOrder, cancellationOrder } from '../../services/order'
import { PayPalButton } from "react-paypal-button-v2";
import getUser from '../../services/user'
import Address from './Address'

const Cart = ({cart, setCart}) => {
  const [address, setAddress] = useState('')
  const [addressBook, setAddressBook] = useState('')

  const calculatePriceTotal = () => cart.reduce((acc, product) => acc + product.price * product.amount, 0)

  const cancelOrder = async () => {
    try{
      const loggedUser = localStorage.getItem('loggedUser')
      if(!loggedUser) window.location.href = "/login";
      const token = JSON.parse(loggedUser).token

      await cancellationOrder(token)
    } catch (err) {
      alert('error', err)
    }
  }

  const corroborateOrder = async () => {
    try{
      const loggedUser = localStorage.getItem('loggedUser')
      if(!loggedUser) window.location.href = "/login";
      const token = JSON.parse(loggedUser).token

      await confirmOrder(token)
    } catch (err) {
      alert('error', err)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      const loggedUser = window.localStorage.getItem('loggedUser')
      if (loggedUser) {
        const token = JSON.parse(loggedUser).token
        const data = await getUser(token)

        setAddressBook(data.user.addressBook)
        setAddress(data.user.addressBook[0])
      }
    }
    getUserData()
  }, [setAddressBook])

  return (
    <>
      {cart.length === 0
      ? (
        <div className="p-4 bg-white rounded-lg border shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div className="flow-root">
            <img alt="" src="https://i.pinimg.com/originals/6f/fd/64/6ffd64c5366898c59bbc91d9aec935c3.png" ></img>
            <p className="my-4 divide-y divide-gray-200 dark:divide-gray-700">
              The order is empty.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white rounded-lg border shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order</h4>
          </div>
          <div className="flow-root">
            <div role="list" className="divide-y divide-gray-200 dark:divide-gray-500">
              {cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 pb-6">
            <span className="text-base text-center ">
              Total Price 
            </span>
            <span className="text-base px-5 text-yellow-500 text-center ">
              ${calculatePriceTotal()}
            </span>
          </div>
          <form>
            <label htmlFor="countries" name="address2" className="block mb-5 text-sm font-medium text-gray-900 dark:text-gray-400">Select your address:
            <select onChange={({target}) => setAddress(target.value)} id="countries" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {addressBook.length === 0 ? <option className=" bg-yellow text-gray-200">Add addresses to your profile</option> : addressBook.map(address => <Address address={address}/>)}
            </select>
            </label>
            <div className="mx-0">
            <PayPalButton
              style= {{
                layout: 'horizontal',
                color:  'blue',
                label:  'checkout',
                tagline: false,
                height: 30,
              }}
              options={{
                clientId: "AeDK6G-jcyQHO4v0TLYBloQ1_h7Q0Mpofa-C8pQIMy3SPKID6csnRidINmfp-lDF483BlyDMB47IwhrR",
                currency: "USD",
              }}
              amount={calculatePriceTotal()}
              onSuccess={async (details, data) => {
                corroborateOrder()
                alert("Transaction completed by " + details.payer.name.given_name);
                window.location.href = "/my-account"
                }
              }
              onCancel={() => {
                cancelOrder()
                return alert("transaction canceled please try again ");
                }
              }
              onClick={async (data, actions) => {
                try {
                  const loggedUser = localStorage.getItem('loggedUser')
                  if (!loggedUser) window.location.href = "/";
                  const token = JSON.parse(loggedUser).token

                  const res = await createOrder(token, cart, address, "Paypal")
                  if (res.status === 404) {
                    
                    alert(res.message)
                    return actions.reject()
                  }

                } catch (err) {
                  cancelOrder()
                  return actions.reject()
                }
              }}
            />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
export default Cart
