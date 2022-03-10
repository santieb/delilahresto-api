import React  from 'react'

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
        <div class="flex item-center justify-between mt-3">
            <h1 class="text-2xl font-extrabold tracking-tightl">
                ${price}
            </h1>
            <button onClick={() => addCart(name)} type="button" class="w-10 h-10 text-base font-medium rounded-full text-white bg-yellow-400 hover:bg-pink-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mx-auto" fill="white" viewBox="0 0 1792 1792">
                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                    </path>
                </svg>
            </button>
        </div>
      </div>
      

    </div>
  )
}

export default Product