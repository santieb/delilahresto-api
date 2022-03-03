import React  from 'react'
import './Product.css'

const Product = ({ product, products, cart, setCart }) => {
  const { name, price } = product

  const addCart = (name) => {
    const product = products.filter(products => products.name === name)
    if(cart.find((products => products.name === name))) {
      alert('This product already added to order')
    }
    else {
      product[0].amount = 1
      console.log(product)
      setCart([...cart, ...product])
    }
  }

  return (
    <div className="product">
      <img alt="" src="https://us.123rf.com/450wm/foodandmore/foodandmore1611/foodandmore161100126/66013283-pizza-con-jam%C3%B3n-y-ensalada-de-r%C3%BAcula-aislar-sobre-fondo-blanco.jpg?ver=6"></img>
      <h5>{name}</h5>
      <p>${price}</p>
      <button onClick={() => addCart(name)}>Add to my order</button>
    </div>
  )
}

export default Product