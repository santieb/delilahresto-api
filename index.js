const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

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


//const orders = require('./routes/orders');
//app.use('/', orders);


const products = require('./routes/products.routes')
app.use('/', products);


const payments = require('./routes/payments.routes')
app.use('/', payments);


const port = 3000;
app.listen(port, function () {
    console.log(`Server listening on port http://localhost:${port}`);
  });