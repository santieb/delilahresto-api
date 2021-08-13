const users = require('../models/users')

const confirmRegistration = (req, res, next) => {
    const check = users.find(users => users.username === req.body.username || users.mail === req.body.mail)
    if(check) res.json({msj: "The username or email is in use."})

    else if(req.body.username === "" || req.body.mail === "" || req.body.mail === "" || req.body.name === "" || req.body.phone === "" || req.body.shippingAddress === "" || req.body.password === ""){
        res.json({msj: "Fill in all fields"})
    }
    else next()
}

const confirmLogin = (req, res, next) => {
    const check = users.find(users => users.username === req.body.userOrEmail && users.password === req.body.password || users.mail === req.body.userOrEmail && users.password === req.body.password)
    if(check) next()

    else if(req.body.userOrEmail === "" || req.body.password === "") res.json({msj: "Fill in all fields"})

    else res.json({msj: "Username or email address not found. Please try again"})
}


module.exports = {
    confirmRegistration,     
    confirmLogin                                                                                                  
};

