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
    <div class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex">
      <div class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 dark:text-white">
        <img class="w-10" alt="" src="https://us.123rf.com/450wm/foodandmore/foodandmore1611/foodandmore161100126/66013283-pizza-con-jam%C3%B3n-y-ensalada-de-r%C3%BAcula-aislar-sobre-fondo-blanco.jpg?ver=6"></img>
      </div>
      <div class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
      </div>
      <div class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        ${price * amount}
      </div>
      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white flex direction-row py-4 space-x-2 mx-10 text-sm font-medium text-right whitespace-nowrap  ">
        <button  onClick={() => subtractProduct(name)}>-</button>
        <p >{amount}</p>
        <button  onClick={() => addProduct(name)}>+</button>
      </div>
    </div>
  )
}

export default Product