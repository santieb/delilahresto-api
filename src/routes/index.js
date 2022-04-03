const express = require('express')
const router = express.Router()

const { isAuthenticated, isAdmin} = require('../middlewares/users.middlewares')

router.use('/', require('./auth.routes'))
router.use('/', require('./users.routes'))
router.use('/orders', isAuthenticated, require('./orders.routes'))
router.use('/products', require('./products.routes'))
router.use('/payments', isAuthenticated, require('./payments.routes'))

router.use('/admin', isAdmin)
router.use('/admin', require('./admin.routes/admin.users.routes'))
router.use('/admin', require('./admin.routes/admin.orders.routes'))
router.use('/admin', require('./admin.routes/admin.products.routes'))
router.use('/admin', require('./admin.routes/admin.payments.routes'))

module.exports = router