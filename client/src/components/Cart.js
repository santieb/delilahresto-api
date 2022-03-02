import React from 'react'
import './Cart.css'
import Product from './Product-order'

const Cart = ({cart, setCart}) => {

  return (
    <div className="cart">
      <h4>Order</h4>
      {cart.length === 0 ? (<p>Your order is empty</p>) : (cart.map(product => <Product key={product.name} product={product} cart={cart} setCart={setCart}/> ))}
    </div>
  )
}

export default Cart