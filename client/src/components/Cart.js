import React, { useState } from 'react'
import './Cart.css'
import Product from './Product-order'
import createOrder from '../services/order'

const Cart = ({cart, setCart}) => {
  const [address, setAddress] = useState('')

  const handleBuy = async (event) => {
    event.preventDefault()
    try{
      const loggedUser = localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUser).token
      await createOrder(token, cart, address, "bitcoin")

    } catch (err) {
      alert('error', err)
    }
  }

  return (
    <div className="cart">
      <h4>Order</h4>
      {cart.length === 0 ? (<p>Your order is empty</p>) : (cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> ))}

    <div>
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

    </div>
    </div>
  )
}

export default Cart