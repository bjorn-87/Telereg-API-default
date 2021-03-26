"use strict";

const config = require('../config/config.json');
const azureJWT = require('azure-jwt-verify');

/**
 * Logs incomming to console
 */
var logIncoming = function(req, res, next) {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
};

/**
 * Add routes for 404 and error handling
 * Catch 404 and forward to error handler
 */ 
var fourOFourHandler = (req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
};

/**
 * Errorhandler
 */ 
var errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
};

/**
 * Function to verify azure token from client
 */ 
var verifyToken = function (req, res, next) {
    let jwtToken = req.headers['authorization'];

    azureJWT.verify(jwtToken, config).then(function(decoded) {
        // success callback
            console.log("valid");
            next();
        }, function(error){
        // error callback
            console.log("Not valid");
            return res.status(401).json({
                errors: {
                    status: 401,
                    title: "Authentication failed",
                    detail: JSON.parse(error).message
                }
            });
        });
};

module.exports = {
    logIncoming: logIncoming,
    fourOFourHandler: fourOFourHandler,
    errorHandler: errorHandler,
    verifyToken: verifyToken
};