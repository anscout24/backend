/**
 *  Initialisierung
 *  GET req libs
 *
 */

var express = require('express');
var router = express.Router();


/**
 * Error handling for all routes and methods which are not defined
 */

router.use(function(req, res) {

    return res.status(404).send({

        error: {
            'statuscode': 404,
            'message': 'Route: ' + req.originalUrl + ' or Method: '+req.method+' not defined.',
            'title': "Not defined URL"
        }
    })
});


module.exports = router;