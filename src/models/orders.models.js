const mongoose = require("../config/db.config");
const { Schema } = mongoose;

const orderScheme = new Schema({
	idUser: { type: mongoose.Types.ObjectId, require: true },
	order: [
		//sacar el id
		{
			product: { type: String, require: true },
			productPrice: { type: Number, require: true },
			amount: { type: Number, require: true },
		},
	],
	//state: ObjectId, //enbeber
	methodOfPayment: { type: String, require: true },
	price: { type: Number, require: true },
	date: { type: Date, default: Date.now },
	//shippingAddress: String, //tiene que ser enbebido
});

const orders = mongoose.model("orders", orderScheme);

module.exports = orders;
