const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Acamica API',
      version: '1.0.0'
    }
  },
  apis: ['./swagger.json']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs',
   swaggerUI.serve,
   swaggerUI.setup(swaggerDocs));


const users = require('./routes/users');
app.use('/', users);

const orders = require('./routes/orders');
app.use('/', orders);

const products = require('./routes/products')
app.use('/', products);

const port = 3000;
app.listen(port, function () {
    console.log(`Server listening on port http://localhost:${port}`);
  });