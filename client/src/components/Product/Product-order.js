import React  from 'react'

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
    <div class="py-2 sm:py-3">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img class="w-8 h-8 rounded" src="https://napolicartagena.com/wp-content/uploads/2022/01/La-Historia-de-la-pizza.jpg" alt="Neil image"></img>
        </div>
          <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            ${price * amount}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <div class="items-center text-gray-900 dark:text-white flex direction-row py-4 space-x-2 mx-10 text-sm font-medium text-right whitespace-nowrap  ">
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