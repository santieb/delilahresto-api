const users = require('../models/users')
const orders = require('../models/orders')
const products = require('../models/products')

const confirmId = (req, res, next) => {

    const user = (users.find(users => users.id == req.params.id))
    if (user){
      	if (user.loggedIn == false) res.send("you can't access, log in before");

        else if (user.isAdmin == false) res.send("you can't access")

        else next()
    }else res.send("ID does not exist");
}

module.exports = {
    confirmId
} 