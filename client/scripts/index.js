document.getElementById('send').addEventListener('click', () => {
  const data = {}
  data.email = document.getElementById('email').value
  data.password = document.getElementById('password').value
  console.log(data)
  loginUser(data)
})

const loginUser = async (dataInput) => {
  const { email, password } = dataInput

  const data = { email: email, password: password }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify(data)
  }
  console.log(data)
  await fetch('http://localhost:3000/login', requestOptions)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch((err) => console.log('err:', err))
}