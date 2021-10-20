const express = require('express');
const router = express.Router();
const controllers = require('../controllers/payments.controllers')

router.get('/payments', (req, res) => {

    controllers.listPayments()
        .then(payments => res.json(payments))
        .catch(err => res.json(err));
})


module.exports = router;