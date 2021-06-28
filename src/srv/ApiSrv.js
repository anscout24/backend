#!/usr/bin/env node

/**
 * Module dependencies.
 */

// get .env file
require('dotenv').config();


var Express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('api:server');
var http = require('http');

// react axios request OPTIONS in the first step
var cors = require('cors');




/**
 *  Get Routes
 */

const APIRouter = require('../routes/ApiRouter');
const ApiRouter = new APIRouter();
const swaggerDoc = require('../swagger/docs_serv');
const bodyParser = require("body-parser");
var errorHandling = require('../routes/ErrorHandling');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.API_PORT_LISTEN || '3050');


/**
 * Create ApiServer
 */

var ApiServer = new Express();
ApiServer.set('port', port);



// api engine setup
ApiServer.use(bodyParser.json());
ApiServer.use(logger('dev'));
ApiServer.use(Express.json());
ApiServer.use(Express.urlencoded({ extended: false }));
ApiServer.use(cookieParser());
ApiServer.use(errorHandler);
ApiServer.use(cors()); // means: Access-Control-Allow-Origin: *


/**
 * MAIN API SERVER
 *  * ApiServer.use('/api', <API Router>);
 */

ApiServer.use('/api/v1', ApiRouter);

/**
 * SWAGGER Documentation
 */

ApiServer.use('/api/v1/doc', swaggerDoc);

/**
 * Route for NOT defined Routes
 */

ApiServer.use('*', errorHandling);

/**
 * Create HTTP server.
 */

var server = http.createServer(ApiServer);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

function errorHandler (err, req, res) {
    res.status(err.status).send({ error: err.message })
}


module.exports = ApiServer;
