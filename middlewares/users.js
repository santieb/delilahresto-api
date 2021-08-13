const users = require('../models/users')
const confirmRegistration = (req, res, next) => {
    check = users.filter(users => users.username === req.body.username || users.mail === req.body.mail)
    if(check.length != 0) res.json({msj: "The username or email is in use"})

    else if(req.body.username === "" || req.body.mail === "" || req.body.mail === "" || req.body.name === "" || req.body.phone === "" || req.body.shippingAddress === "" || req.body.password === ""){
        res.json({msj: "Fill in all fields"})
    }
    else next()
}
const confirmLogin = (req, res, next) => {
}


module.exports = {
    confirmRegistration                                                                                                       
};

