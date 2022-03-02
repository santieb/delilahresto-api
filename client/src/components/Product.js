import React from 'react'

const Product = ({ product, products, cart, setCart }) => {
  const { name, price } = product

    const addCart = (name) => {
      const product = products.find(products => products.name === name)
      setCart([...cart, ...product])
    }

  return (
    <div>
      <h5>{name}</h5>
      <p>{price}</p>
      <button onclick={() => addCart(name)}>add to cart</button>
    </div>
  )
}

export default Product