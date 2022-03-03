import React  from 'react'
import './Products-order.css'

const Product = ({ product, products, cart, setCart }) => {
  const { name, price, amount } = product

  const quantityIsEmpty = () => {
    const newCart = cart.filter(products => products.amount !== 0)
    setCart(newCart)
  }

  const addProduct = (name) => cart.map(products => products.name === name ? products.amount++ : products)

  const subtractProduct = (name) => {
    cart.map(products => products.name === name ? products.amount-- : products)
    
    quantityIsEmpty()
  }

  return (
    <div className="product-order">
      <img alt="" src="https://us.123rf.com/450wm/foodandmore/foodandmore1611/foodandmore161100126/66013283-pizza-con-jam%C3%B3n-y-ensalada-de-r%C3%BAcula-aislar-sobre-fondo-blanco.jpg?ver=6"></img>
      <h5>{name}</h5>
      <p>${price * amount}</p>
      <div className="controllers">
        <button  onClick={() => subtractProduct(name)}>-</button>
        <p className="quantity">{amount}</p>
        <button  onClick={() => addProduct(name)}>+</button>
      </div>
    </div>
  )
}

export default Product