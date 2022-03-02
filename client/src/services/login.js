const login = async ({ email, password }) => {
  const data = { email, password }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  
  try{
  const res = await fetch('http://localhost:3000/login', requestOptions)
  const userData = await res.json();
  return userData

  } catch (err) {
   return err
  }
}

export default login 