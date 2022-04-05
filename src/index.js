const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const { swaggerDocs, swaggerUI } = require('./config/swagger.config')

app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs))

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/', (req, res) => {
  res.status(200).send('Ok')
})

app.use('/api', require('./routes'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
