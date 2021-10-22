const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/users.controllers')
const middlewares = require('../../middlewares/users.middlewares')

router.get('/users', (req, res) => {
    controllers.listUsers()
        .then((users) =>
            res.status(200).json({
                message: 'Data find successfully',
                users: users,
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to find data',
                errors: err,
                status: 400
            }))
})

router.put('/users/:idUser', middlewares.validateUserID, (req, res) => {
    controllers.suspendUser(req)
        .then(() =>
            res.status(200).json({
                message: 'Data update successfully',
                status: 200
            }))
        .catch((err) =>
            res.status(404).json({
                message: 'Unable to update data',
                errors: err,
                status: 400
            }))
})


module.exports = router