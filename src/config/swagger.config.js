const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
      title: 'Delilah Restó API',
      version: '2.0'
    }
  },
  apis: ['swagger.yaml']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = {
    swaggerDocs,
    swaggerUI,
}
