const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users.controllers')
const middlewares = require('../middlewares/users.middlewares')

router.post('/register', middlewares.validateRequest, (req, res) => {
  controllers.createUser(req)
    .then((user) =>
      res.status(200).json({
        message: 'User created successfully',
        user: user,
        status: 200
      }))
    .catch((err) =>
      res.status(400).json({
        message: 'Unable to insert data',
        errors: err,
        status: 400
      }))
})

router.post('/login', middlewares.validateLogin, (req, res) => {
  controllers.loginUser(req)
    .then((token) =>
      res.status(200).json({
        message: 'Session started successfully',
        token: token,
        status: 200
      }))
    .catch((err) =>
      res.status(400).json({
        message: 'Unable to insert data',
        errors: err,
        status: 400
      }))
})

module.exports = router
