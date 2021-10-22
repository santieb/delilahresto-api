const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const userScheme = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    addressBook: [
        {
            shippingAddress: { type: String, require: true },
            id: { type: Number }
        }
    ],
    isAdmin: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false }
},
    {
        timestamps: true
    }
);

const users = mongoose.model("users", userScheme)


module.exports = users