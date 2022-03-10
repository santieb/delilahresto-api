const updateUser = async (token, data) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'Accept': '*/*'
    },
    body: JSON.stringify(data)
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
export default updateUser