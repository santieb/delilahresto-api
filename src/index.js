const express = require('express')
const app = express()
const helmet = require('helmet')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Delilah Restó API',
      version: '1.0.0'
    }
  },
  apis: ['swagger.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs))

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/', (req, res) => {
  res.status(200).send('Ok')
})

const { isAuthenticated, isAdmin} = require('./middlewares/users.middlewares')

app.use('/', require('./routes/users.routes'))
app.use('/user', isAuthenticated, require('./routes/addressBook.routes'))
app.use('/orders', isAuthenticated, require('./routes/orders.routes'))
app.use('/products', isAuthenticated, require('./routes/products.routes'))
app.use('/payments', isAuthenticated, require('./routes/payments.routes'))

app.use('/admin', isAdmin)
app.use('/admin', require('./routes/admin.routes/admin.users.routes'))
app.use('/admin', require('./routes/admin.routes/admin.orders.routes'))
app.use('/admin', require('./routes/admin.routes/admin.products.routes'))
app.use('/admin', require('./routes/admin.routes/admin.payments.routes'))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
