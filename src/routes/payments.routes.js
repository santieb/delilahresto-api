const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payments.controllers')
const middlewares = require('../middlewares/payments.middlewares')
const middlewaresUser = require('../middlewares/users.middlewares')

router.get('/payments', middlewaresUser.isAuthenticated, (req, res) => {

    controllers.listPayments()
    .then(payments => res.json(payments))
    .catch(err => res.json(err));
})


module.exports = router;