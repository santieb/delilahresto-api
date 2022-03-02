const getUser = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': '*/*'
    }
  }
  
  try{
  const res = await fetch('http://localhost:3000/user/me', requestOptions)
  const userData = await res.json();
  console.log(userData)
  return userData

  } catch (err) {
   return err
  }
}

export default getUser 