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



const middlewares = require('./middlewares/users.middlewares')

//user routes
const users = require('./routes/users.routes');
app.use('/', users);

const orders = require('./routes/orders.routes');
app.use('/', middlewares.isAuthenticated, orders);

const products = require('./routes/products.routes')
app.use('/', middlewares.isAuthenticated, products);

const payments = require('./routes/payments.routes')
app.use('/', middlewares.isAuthenticated, payments);

//admin routes
const adminUsers = require('./routes/admin.routes/admin.users.routes')
app.use('/admin', middlewares.isAdmin, adminUsers);

const adminOrders = require('./routes/admin.routes/admin.orders.routes');
app.use('/admin', middlewares.isAdmin, adminOrders);

const adminProducts = require('./routes/admin.routes/admin.products.routes')
app.use('/admin', middlewares.isAdmin, adminProducts);

const adminPayments = require('./routes/admin.routes/admin.payments.routes')
app.use('/admin', middlewares.isAdmin, adminPayments);


app.listen(port, function () {
	console.log(`Server listening on port http://localhost:${port}`);
});