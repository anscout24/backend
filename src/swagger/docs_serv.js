var express = require('express');
var router = express.Router();

/**
 *  Swagger
 */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./config');

// by default the swagger explorer bar is hidden
var options = {
    explorer: true,
    customCss: '.swagger-ui .topbar {display: none}'
};

const swaggerDocs = swaggerJsDoc(swagger.swaggerOptions);
router.use('/',swaggerUi.serve, swaggerUi.setup(swaggerDocs,options));


module.exports = router;