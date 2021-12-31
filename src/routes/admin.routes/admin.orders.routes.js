const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/orders.controllers')
const middlewares = require('../../middlewares/orders.middlewares')

router.get('/allOrders', (req, res) => {
  controllers.getAllOrders()
    .then((orders) =>
      res.status(200).json({
        message: 'Data find successfully',
        orders: orders,
        status: 200
      }))
    .catch((err) =>
      res.status(400).json({
        message: 'Unable to find data',
        errors: err,
        status: 404
      }))
})

router.put('/allOrders/:idOrder', middlewares.validateState, (req, res) => {
  controllers.changeOrderStatus(req)
    .then(() =>
      res.status(200).json({
        message: 'Data update successfully',
        status: 200
      }))
    .catch((err) =>
      res.status(400).json({
        message: 'Unable to update data',
        errors: err,
        status: 400
      }))
})

module.exports = router
