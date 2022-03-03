const createOrder = async (token, order, methodOfPayment, shippingAddress) => {
  const data = { 
    'order': order,
    'methodOfPayment': methodOfPayment,
    'shippingAddress': shippingAddress 
  }

  console.log(data)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(data)
  }

  try {
  const res = await fetch('http://localhost:3000/orders', requestOptions)
  console.log(res)
  const data = await res.json();
  return data

  } catch (err) {
   return err
  }
}

export default createOrder 