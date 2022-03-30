import React  from 'react'

const Product = ({ product, products, cart, setCart }) => {
  const { name, price, amount, imgURL } = product

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
    <div className="py-2 sm:py-3">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded" src={imgURL} alt=""></img>
        </div>
          <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            ${price * amount}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <div className="items-center text-gray-900 dark:text-white flex direction-row py-4 space-x-2 mx-10 text-sm font-medium text-right whitespace-nowrap  ">
            <button  onClick={() => subtractProduct(name)}>-</button>
              <p >{amount}</p>
            <button  onClick={() => addProduct(name)}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product