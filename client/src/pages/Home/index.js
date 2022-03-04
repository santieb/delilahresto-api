import React, { useState, useEffect } from 'react'
import Product from '../../components/Product/Product'
import Cart from '../../components/Cart/Cart'
import './styles.css'

const App = ({user}) => {
  const [products, setProducts] = useState()
  const [cart, setCart] = useState([])

  useEffect( () => {
      fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [products])

  return ( 
    <>
      <div>
        <div className="products">
          {products && products.map(product => <Product key={product.name} product={product} products={products} cart={cart} setCart={setCart} />)}
        </div>
      </div>
      <div>
        <Cart cart={cart} setCart={setCart}></Cart>
      </div>
    </>
  )
}

export default App;
