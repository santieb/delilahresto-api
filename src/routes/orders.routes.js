const express = require('express')
const router = express.Router()
const controllers = require('../controllers/orders.controllers')
const middlewares = require('../middlewares/orders.middlewares')

router.post('/', middlewares.validateRequest, (req, res) => {
  controllers.createOrder(req, res)
    .then((order) =>
      res.status(200).json({
        message: 'Order created successfully',
        order: order,
        status: 200
      }))
    .catch((err) =>
      res.status(400).json({
        message: 'Unable to insert data',
        errors: err,
        status: 400
      }))
})

router.put('/', middlewares.validateChanges, (req, res) => {
  controllers.modifyOrder(req, res)
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

router.put('/confirmation', middlewares.validateConfirmation, (req, res) => {
  controllers.confirmOrder(req)
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

router.get('/history', (req, res) => {
  controllers.getHistory(req)
    .then((history) =>
      res.status(200).json({
        message: 'Data find successfully',
        history: history,
        status: 200
      }))
    .catch((err) =>
      res.status(404).json({
        message: 'Unable to find data',
        errors: err,
        status: 404
      }))
})

module.exports = router
