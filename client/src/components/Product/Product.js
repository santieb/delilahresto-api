import React  from 'react'
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
    <div class="w-64 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img class="rounded-t-lg" src="https://napolicartagena.com/wp-content/uploads/2022/01/La-Historia-de-la-pizza.jpg" alt="" />
      <div class="p-2">
        <h5 class="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p class="font-sm text-sm text-gray-700 dark:text-gray-400">x2cheese, extra bacon, tomato, potato and other combinations</p>
        <div class="flex items-baseline text-gray-900 dark:text-white">
          <span class="text-1xl font-semibold">$</span>
          <span class="text-2xl font-extrabold tracking-tight">{price}</span>
        </div>
          <img class="ml-48 cursor-pointer" onClick={() => addCart(name)} src={images.cart} alt=""></img>
      </div>
    </div>
  )
}

export default Product