const express = require('express')
const router = express.Router()

app.get('/', (req, res) => {
  res.send('OK').status(200)
})

module.exports = router