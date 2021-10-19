const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/users.controllers')
const middlewares = require('../../middlewares/users.middlewares')

router.get('/users', (req, res) => {

    controllers.listUsers()
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.put('/users/:idUser', middlewares.isAdmin, middlewares.validateUserID, (req, res ) => {

    controllers.suspendUser(req)
    .then(() => res.json({ msj: "User suspended" }))
    .catch((err) => res.json(err))

});


module.exports = router;