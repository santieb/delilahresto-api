import React  from 'react'

const Product = ({ product, products, cart, setCart, user }) => {
  const { name, price, description, imgURL } = product
  
  const addCart = (name) => {
    if (!user) return alert('log in before adding a product')

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
    <div className="w-64 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg h-36 w-full" src={imgURL} alt="" />
      <div className="p-2">
        <h5 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        <p className="font-sm text-sm text-gray-700 dark:text-gray-400">{description}</p>
        <div className="flex item-center justify-between mt-3">
            <h1 className="text-2xl font-extrabold tracking-tightl">
                ${price}
            </h1>
            <button onClick={() => addCart(name)} type="button" className="w-10 h-10 text-base font-medium rounded-full text-white bg-yellow-400 hover:bg-pink-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fillRule="white" viewBox="0 0 1792 1792">
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