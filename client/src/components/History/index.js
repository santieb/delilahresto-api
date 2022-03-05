import React, { useState, useEffect } from 'react'
import { getHistory } from '../../services/order'
import Order from '../Order/Order'

const App = () => {
    const [ history, setHistory ] = useState([])

  useEffect(() => {
    const getUserData = async () => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        const token = JSON.parse(loggedUser).token
        const data = await getHistory(token)
        const history = data.history.reverse()
        setHistory(history)
    } 
    getUserData()
  }, [setHistory])

  return ( 
    <div class="flex flex-col bg-white sm:w-8/12 sm:ml-4 rounded-lg shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">History</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Orders history</p>
      </div>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    State
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Date
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Description
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Payment
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Price
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    address
                  </th>
                </tr>
              </thead>
              <tbody>
                {history && history.map(order => <Order key={order.id} order={order} />)}
                {!history && <p>Loading...</p>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
