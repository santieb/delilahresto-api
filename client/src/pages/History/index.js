import React, { useState, useEffect } from 'react'
import { getHistory } from '../../services/order'
import Order from '../../components/Order/Order'

const App = () => {
    const [ history, setHistory ] = useState([])

  useEffect(() => {
    const getUserData = async () => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        const token = JSON.parse(loggedUser).token
        const data = await getHistory(token)
        
        setHistory(data.history)
    } 
    getUserData()
  }, [setHistory])

  return ( 
    <>
      <h3>History</h3>
      <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-md sm:rounded-lg">
                <table class="min-w-full">
                    <thead class="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Date
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Description
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Payment
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Price
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
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
    </>
  )
}

export default App;
