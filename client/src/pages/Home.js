import React, { useState, useEffect } from 'react'
import Product from '../components/Product'

const App = () => {
  const [products, setProducts] = useState()
  const [cart, setCart] = useState()
  useEffect( () => {
      fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [products])

  return ( 
    <div>
      <div>
        <h3>Products</h3>
        {products && products.map(product => <Product product={product} products={products} cart={cart} setCart={setCart} />)}
      </div>
    </div>
  )
}

export default App;
