const users = require('../models/users')

const confirmRegistration = (req, res, next) => {
    check = users.filter(user => user.username === req.body.username && user.mail === req.body.mail)
    if(check.length != 0) {res.json({msj: "The username or email is in use"})}

    if(req.body.username === ""){ //no funciona esto
        res.json({msj: "Fill in all fields"})
    }
    next()
}
module.exports = {
    confirmRegistration                                                                                                       
};


