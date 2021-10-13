const orders = require('../models/orders.models');
const products = require('../models/products.models');

const createOrder = async (req,res) => {  
    try{

    const orders = req.body.order;

    const idProduct = orders.idProduct

    const product = await products.findOne({ _id: idProduct })

    const newOrder = {
        order: [
            {
              product: product,
              amount : order.amount
            }
          ],
    };

    const order = new orders(newOrder);
    const response = await order.save();
    res.send(response)
    }
    catch(orders){
        console.log(orders)
        res.send("error")
    }
};

module.exports = {
    createOrder,
}


