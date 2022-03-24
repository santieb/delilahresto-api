import React  from 'react'
import images from '../../assets/images'

const Address = ({ address, handleDelete }) => {

  return (
    
    address ?
    (<div class="flex flex-row">
      <input defaultValue={address.address} type="text" disabled name="address" class="text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <button onClick={() => handleDelete(address.id)}>
          <img alt="" src={images.borrar}></img>
        </button>
      </div>) 
    : <></>
  )
}

export default Address 