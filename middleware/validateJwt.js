/* eslint no-unused-vars: 0 */

"use strict";

var jwksClient = require('jwks-rsa');
var jwt = require('jsonwebtoken');

/**
 * Validates json web token from azure AD
 *
 * @param {*} res response
 * @param {*} next next
 * @param {string} token JwT token from azure ad
 * @param {object} config Configuration options, issuer, jwksUri, audience
 * @returns error or next
 */
function validateJwt(res, next, token, config) {
    var decoded = jwt.decode(token, {complete: true});
    var getKey;

    if (decoded) {
        var header = decoded.header;

        var options = {
            algorithms: ['RS256'],
            audience: config.audience,
            issuer: config.issuer
        };

        var client = jwksClient({
            jwksUri: config.jwksUri
        });

        getKey = function(header, callback) {
            client.getSigningKey(header.kid, function(err, key) {
                var signingKey = key.publicKey || key.rsaPublicKey;

                callback(null, signingKey);
            });
        };

        jwt.verify(token, getKey, options, async function(err, decoded) {
            //This will display the decoded JWT token.
            // console.log(decoded);
            if (err) {
                console.error(err.message);
                return res.status(401).json({
                    errors: {
                        status: 401,
                        title: "Authentication error",
                        message: err
                    }
                });
            }

            next();
        });
    } else {
        console.error("Authentication error: Invalid token");
        return res.status(401).json({
            errors: {
                status: 401,
                title: "Authentication error",
                message: "Invalid token"
            }
        });
    }
}

module.exports = validateJwt;
