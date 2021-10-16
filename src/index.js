const express = require('express');
const app = express();
const helmet = require('helmet')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')



const port = process.env.PORT || 3000;
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Acamica API',
			version: '1.0.0'
		}
	},
	apis: ['swagger.js']
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs',
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocs));


const users = require('./routes/users.routes');
app.use('/', users);


const orders = require('./routes/orders.routes');
app.use('/', orders);


const products = require('./routes/products.routes')
app.use('/', products);


const payments = require('./routes/payments.routes')
app.use('/', payments);


app.listen(port, function () {
	console.log(`Server listening on port http://localhost:${port}`);
});