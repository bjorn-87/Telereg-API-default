/* eslint no-unused-vars: 0 */

"use strict";

const jwt = require('jsonwebtoken');
const validateJwt = require('./validateJwt.js');

var config;

try {
    config = require('../config/config.js');
} catch (error) {
    console.error(error.message);
}

// secret for jwt_token during tests
const secret = config.jwtSecret;

// config for azure-jwt-verify
const azureConfig = config.azureConfig;

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

    console.error(err.message);
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

    if (!jwtToken) {
        console.error("Authentication failed: No jwt token in header");
        return res.status(401).json({
            errors: {
                status: 401,
                title: "Authentication failed",
                detail: "No jwt token in header"
            }
        });
    }

    if (process.env.NODE_ENV !== 'test') {
        validateJwt(res, next, jwtToken, azureConfig);
    } else {
        jwt.verify(jwtToken, secret, function(err) {
            if (err) {
                console.error(err.message);
                return res.status(401).json({
                    errors: {
                        status: 401,
                        title: "Authentication failed",
                        detail: err.message
                    }
                });
            }

            next();
        });
    }
};

/**
 * create a token.
 */
var createToken = function(email) {
    let payload = {email: email};
    let jwtToken = jwt.sign(payload, secret, { expiresIn: '12h' });

    return jwtToken;
};

module.exports = {
    fourOFourHandler: fourOFourHandler,
    errorHandler: errorHandler,
    verifyToken: verifyToken,
    createToken: createToken
};
