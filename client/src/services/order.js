const createOrder = async (token, order, methodOfPayment, shippingAddress) => {

  const data = { order, methodOfPayment ,shippingAddress }
  console.log(data)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': '*/*'
    },
    body: JSON.stringify(data)
  }

  try {
  const res = await fetch('http://localhost:3000/orders', requestOptions)
  const data = await res.json();
  return data

  } catch (err) {
   return err
  }
}

export default createOrder 