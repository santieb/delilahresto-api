const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const orderScheme = new Schema({
	idUser: { type: mongoose.Types.ObjectId, require: true },
	order: [
		{
			product: { type: String, require: true },
			productPrice: { type: Number, require: true },
			amount: { type: Number, require: true },
		},
	],
	state: { type: String, default: "new" },
	price: { type: Number, require: true },
	methodOfPayment: { type: String, require: true },
	description: { type: String, require: true },
	shippingAddress: { type: String, require: true },
	number: { type: String, require: true },
	hour: { type: String, require: true },
},
	{
		timestamps: true
	});


const orders = mongoose.model("orders", orderScheme);

module.exports = orders;
