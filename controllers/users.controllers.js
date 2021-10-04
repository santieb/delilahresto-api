const users = require('../models/users.models')

const listUsers = async () => await users.find();

const createUser = async (req) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        shippingAddress: req.body.shippingAddress,
        isAdmin: false,
        loggedIn: false,
    };
    const user = new users(newUser);
    const response = await user.save();
    return response;
};

const loginUser = async (req) => {
    const filter = { email: req.body.email, password: req.body.password };
    const update = { loggedIn: true };
    await users.findOneAndUpdate(filter,update); 
}


//middlewares
const confirmUser = async (req, res, next) => {
    try{
        const userValidate = await users.exists ( {_id: req.params.idUser} )
        if(userValidate) {
            const loggedIn = await users.exists ( {_id: req.params.idUser, loggedIn: true } )
            loggedIn ? next() : res.status(404).json("you can't access, log in before");
        }else res.status(404).json("ID does not exist"); 
    }catch{
        res.status(404).json("not found"); 
    }
}

const confirmIsAdmin = async (req, res, next) => {
    try{
        const userValidate = await users.exists ( {_id: req.params.idUser, isAdmin: true} )
        userValidate ? next() : res.status(404).json("you can't access")
    }catch{
        res.status(404).json("not found"); 
    }
} 

const validateEmail = async (req, res, next) => {
    try{
        const emailExists = await users.exists ( { email: req.body.email} );
        emailExists ? res.status(404).json("The email is in use") : next()
    }catch{
        res.status(404).json("not found");
    }

}

const confirmLogin = async (req, res, next) => {
    try{
        const searchByEmail= await users.exists({ email: req.body.email, password: req.body.password });
        searchByEmail ? next() : res.status(404).json({msj: "Email address or password not found. Please try again"})
    }catch{
        res.status(404).json("not found");
    }

}

module.exports = {                                                             
    listUsers,
    createUser,
    loginUser,
    confirmUser,
    confirmIsAdmin,   
    validateEmail,     
    confirmLogin,                                                                           
};

