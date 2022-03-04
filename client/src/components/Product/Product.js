import React  from 'react'
import './Product.css'
import images from '../../assets/images'

const Product = ({ product, products, cart, setCart }) => {
  const { name, price } = product

  const addCart = (name) => {
    const product = products.filter(products => products.name === name)

    if(cart.find((products => products.name === name))) {
      alert('This product already added to order')
    }
    else {
      product[0].amount = 1
      setCart([...cart, ...product])
    }
  }

  return (
    <div className="product">
      <img alt="" src="https://napolicartagena.com/wp-content/uploads/2022/01/La-Historia-de-la-pizza.jpg"></img>
      <div className="product-info">
        <h5>{name}</h5>
        <p>${price}</p>
        <img alt="" onClick={() => addCart(name)} src={images.bag}></img>
      </div>
    </div>
  )
}

export default Product