import React, { useState, useEffect } from 'react'
import Product from '../../components/Product/Product'
import Cart from '../../components/Cart/Cart'

const App = ({user}) => {
  const [products, setProducts] = useState()
  const [cart, setCart] = useState([])

  useEffect( () => {
      fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [products])

  return ( 
    <div class="md:mx-52 flex px-12 py-6">
      <div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products && products.map(product => <Product key={product.name} product={product} products={products} cart={cart} setCart={setCart} />)}
        </div>
      </div>
      <div class="w-4/12 pl-12 justify-between">
        <Cart cart={cart} setCart={setCart}></Cart>
      </div>
    </div>
  )
}

export default App;