import React  from 'react'
import images from '../../assets/images'

const Product = ({ order }) => {
  const { description, hour, price, methodOfPayment, shippingAddress } = order

  return (
    <tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
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