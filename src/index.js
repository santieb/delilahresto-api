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

const middlewares = require('./middlewares/users.middlewares')

app.get('/', (req, res) => {
  res.status(200).send('Ok')
})

// user routes
const users = require('./routes/users.routes')
app.use('/', users)

const addressBook = require('./routes/addressBook.routes')
app.use('/user', middlewares.isAuthenticated, addressBook)

const orders = require('./routes/orders.routes')
app.use('/orders', middlewares.isAuthenticated, orders)

const products = require('./routes/products.routes')
app.use('/products', middlewares.isAuthenticated, products)

const payments = require('./routes/payments.routes')
app.use('/payments', middlewares.isAuthenticated, payments)

// admin routes
const adminUsers = require('./routes/admin.routes/admin.users.routes')
app.use('/admin', middlewares.isAdmin, adminUsers)

const adminOrders = require('./routes/admin.routes/admin.orders.routes')
app.use('/admin', middlewares.isAdmin, adminOrders)

const adminProducts = require('./routes/admin.routes/admin.products.routes')
app.use('/admin', middlewares.isAdmin, adminProducts)

const adminPayments = require('./routes/admin.routes/admin.payments.routes')
app.use('/admin', middlewares.isAdmin, adminPayments)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
