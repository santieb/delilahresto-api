import React  from 'react'

const Product = ({ order }) => {
  const { description, hour, price, methodOfPayment, shippingAddress, state } = order

  return (
    <tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
      <td class="py-4 px-6 text-sm whitespace-nowrap dark:text-white">
          {state === "confirmed" ? <p class="text-lg text-green-400">{state}</p>
          : state === "cancelled" ? <p class="text-lg text-red-800">{state}</p>
          :<p class="text-lg text-blue-300">{state}</p>}
      </td>
      <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {hour}
      </td>
      <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {description}
      </td>
      <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {methodOfPayment}
      </td>
      <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {price}
      </td>
      <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
          {shippingAddress}
      </td>
    </tr>
  )
}

export default Product 