const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controllers')
const middlewares = require('../middlewares/users.middlewares')

router.get('/', (req, res) => {

    controllers.listUsers()
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


router.post('/register', middlewares.validateEmail, (req, res) => {

    controllers.createUser(req)
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
});


router.post('/login', middlewares.confirmLogin, (req, res) => {

    controllers.loginUser(req)
    .then((response) => res.json({ msj: "session started", token: response }))
    .catch((err) => res.json(err))
});


router.put('/suspend/:idUser', middlewares.isAdmin, middlewares.validateUserID, (req, res ) => {

    controllers.suspendUser(req)
    .then(() => res.json({ msj: "User suspended" }))
    .catch((err) => res.json(err))

});


module.exports = router;