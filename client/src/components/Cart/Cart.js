import React, { useState } from 'react'
import './Cart.css'
import Product from '../Product/Product-order'
import createOrder from '../../services/order'

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
    <div className="cart">
      <h4>Order</h4>
      {cart.length === 0
      ? (<p>Your order is empty</p>) 
      : (<div>
          {cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> )}
          <p>Total ${calculatePriceTotal()}</p>
          <form onSubmit={handleBuy}>
            <input
              type='text'
              value={address}
              name='Address'
              placeholder='Address'
              onChange={({target}) => setAddress(target.value)}
            />
            <button>pagar</button>
          </form>
        </div>)}
    </div>
  )
}

export default Cart