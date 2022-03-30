import React  from 'react'

const Product = ({ order }) => {
  const { description, date, price, methodOfPayment, shippingAddress, state } = order

  return (
    <tr className="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
      <td className="py-4 px-6 text-sm whitespace-nowrap dark:text-white">
          {state === "confirmed" ? <p className="text-lg text-green-400">{state}</p>
          : state === "cancelled" ? <p className="text-lg text-red-800">{state}</p>
          :<p className="text-lg text-blue-300">{state}</p>}
      </td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {date}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {description}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {methodOfPayment}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {price}
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {shippingAddress}
      </td>
    </tr>
  )
}

export default Product 